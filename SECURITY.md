# ElectionDosti — Security

Security architecture, secrets management, and vulnerability reporting for ElectionDosti.

---

## Reporting a Vulnerability

If you discover a security vulnerability in ElectionDosti, please report it responsibly:

- **Email:** vishnu8k@gmail.com
- **Subject line:** `[SECURITY] ElectionDosti — <brief description>`
- **Response time:** We aim to acknowledge reports within 48 hours

Please do not open a public GitHub issue for security vulnerabilities.

---

## Security Architecture

### Application Default Credentials (ADC)

ElectionDosti uses **Application Default Credentials** for all server-side Google Cloud access. No service account JSON files are stored in the repository or Docker image.

**How it works:**

| Environment | ADC Source |
|---|---|
| Cloud Run (production) | Cloud Run service account — credentials provided automatically by the platform |
| Local development | `gcloud auth application-default login` — developer's own credentials |
| CI/CD (GitHub Actions) | Service account key stored in GitHub Secrets (`GCP_SA_KEY`) |

**Implementation** in `lib/firebase/admin.ts`:

```typescript
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
}
```

This was a deliberate security fix — the application previously used a `firebase-sa.json` file copied into the Docker image. That file has been removed and the `Dockerfile` no longer contains any `COPY .env*` or `COPY firebase-sa.json` lines.

### Vertex AI Access

The Gemini AI model (`lib/ai/gemini.ts`) authenticates via the same ADC mechanism:

```typescript
const vertex_ai = new VertexAI({
  project: process.env.GCP_PROJECT_ID,
  location: 'us-central1'
});
```

The Cloud Run service account must have the **Vertex AI User** IAM role.

---

## Input Validation

Every API route validates incoming requests with **Zod schemas** before processing. Invalid requests receive a `400 Bad Request` response with structured error details.

### Validated API Routes

| Route | Schema | Validates |
|---|---|---|
| `POST /api/chat` | `ChatRequestSchema` | `message` (string, 1-500 chars), `language` (enum), `history` (array, max 16 turns) |
| `POST /api/myth` | `MythRequestSchema` | `claim` (string, 1-300 chars), `language` (enum) |
| `POST /api/tts` | Body validation | `text` (string), `language` (string) |
| `POST /api/stt` | FormData validation | Audio blob presence check |

**Example pattern** (from `/api/chat`):

```typescript
const ChatRequestSchema = z.object({
  message: z.string().min(1).max(500),
  language: z.enum(['en', 'hi', 'ta', 'te', 'kn', 'bn']),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    text: z.string()
  })).max(16)
});

export async function POST(req: NextRequest) {
  try {
    const data = ChatRequestSchema.parse(await req.json());
    // ... proceed with validated data
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Response.json({ error: e.errors }, { status: 400 });
    }
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

---

## Secrets That Are NEVER in the Repo

The following files and values are excluded from version control and Docker images:

| File / Value | Excluded By | Notes |
|---|---|---|
| `.env.local` | `.gitignore`, `.gcloudignore`, `.dockerignore` | Contains local development secrets |
| `firebase-sa.json` | `.gitignore`, `.gcloudignore` | Service account key — replaced by ADC |
| `GCP_SA_KEY` | GitHub Secrets only | Used by CI/CD pipeline, never in code |
| Private API keys | Environment variables on Cloud Run | Set via `--set-env-vars` at deploy time |

The `.gcloudignore` file uses `#!include:.gitignore` to inherit all gitignore rules, ensuring Cloud Build uploads never contain secrets.

---

## Firestore Security Rules

Current rules deployed in `firestore.rules`:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /constituencies/{document=**} {
      allow read: if true;
      allow write: if false;       // Write-only via Admin SDK
    }
    match /myths/{document=**} {
      allow read: if true;
      allow write: if false;       // Write-only via Admin SDK
    }
    match /{document=**} {
      allow read, write: if false; // Deny-all default
    }
  }
}
```

**Key principles:**
- **Deny-all default** — the catch-all rule at the bottom blocks any collection not explicitly listed
- **Read-only client access** — election and myth data can be read but never written from the client
- **Admin SDK bypass** — server-side writes via `firebase-admin` use ADC and bypass security rules entirely

---

## API Key Restrictions

### Google Maps JavaScript API Key

The `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is a browser-side key with the following restrictions:

| Restriction | Value |
|---|---|
| **Application type** | HTTP referrer |
| **Allowed referrers** | `*.run.app/*`, `localhost:3000/*` |
| **API restrictions** | Maps JavaScript API, Places API only |

This key is intentionally public (prefixed `NEXT_PUBLIC_`) but restricted to prevent abuse from unauthorized domains.

### Firebase API Key

The `NEXT_PUBLIC_FIREBASE_API_KEY` is a standard Firebase client key. It is safe to expose in client-side code because Firebase security is enforced by Firestore Security Rules, not by the API key itself.

---

## Content Security

- **React auto-escaping** — Next.js/React automatically escapes all rendered content. `dangerouslySetInnerHTML` is not used anywhere in the codebase.
- **Gemini responses as plain text** — AI-generated content is rendered as text nodes, never as raw HTML.
- **Server-side AI calls only** — Gemini and Cloud TTS are called exclusively from API routes. The `@google-cloud/vertexai` package is never imported in client components.
