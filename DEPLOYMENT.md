# ElectionDosti — Deployment Guide

Instructions for deploying ElectionDosti to Google Cloud Run, running locally, and troubleshooting common issues.

---

## Live URL

**https://electiondosti-229841118256.asia-south1.run.app**

- **Service name:** `electiondosti`
- **Region:** `asia-south1` (Mumbai)
- **Platform:** Google Cloud Run (managed)
- **Project:** `promptwars1-493604`

---

## Prerequisites

### Google Cloud APIs

Enable these APIs in your GCP project:

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  aiplatform.googleapis.com \
  texttospeech.googleapis.com \
  speech.googleapis.com \
  translate.googleapis.com \
  firestore.googleapis.com \
  maps-backend.googleapis.com
```

### Local Tools

| Tool | Version | Purpose |
|---|---|---|
| Node.js | 20.x LTS | Runtime |
| npm | 10.x | Package manager |
| gcloud CLI | Latest | Cloud Run deployment |
| Docker | 24.x+ | Local container testing (optional) |
| Git | 2.40+ | Version control |

### Firebase Setup

1. Create a Firebase project linked to your GCP project
2. Enable Firestore in Native mode
3. Deploy security rules: `firebase deploy --only firestore:rules`

---

## Local Development

```bash
# 1. Clone the repository
git clone https://github.com/vishnu8k/ElectionDosti.git
cd ElectionDosti

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Edit .env.local with your credentials
#    NEXT_PUBLIC_FIREBASE_API_KEY=your-key
#    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
#    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
#    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
#    GCP_PROJECT_ID=your-gcp-project-id

# 5. Start the development server
npm run dev

# 6. Open http://localhost:3000
```

For server-side Google Cloud calls (Gemini, TTS) to work locally, authenticate with:

```bash
gcloud auth application-default login
```

This sets up Application Default Credentials (ADC) on your local machine, matching the same auth flow used in production on Cloud Run.

---

## Manual Deployment

### Option A: Direct Source Deploy (Recommended)

Deploy directly from source using `gcloud run deploy`:

```bash
gcloud run deploy electiondosti \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --memory=1Gi \
  --cpu=1 \
  --set-env-vars="NODE_ENV=production,GCP_PROJECT_ID=promptwars1-493604"
```

This command builds the Docker image via Cloud Build and deploys it to Cloud Run in one step.

### Option B: Cloud Build Pipeline

Use the `cloudbuild.yaml` configuration:

```bash
gcloud builds submit --config=cloudbuild.yaml --region=asia-south1
```

The pipeline defined in `cloudbuild.yaml` performs three steps:
1. Build Docker image and tag with commit SHA
2. Push image to Artifact Registry
3. Deploy image to Cloud Run with environment variables

---

## Auto-Deployment via GitHub Actions

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that automatically deploys to Cloud Run on every push to `main`.

### Workflow Steps

1. Checkout code
2. Authenticate to Google Cloud using service account key stored in GitHub Secrets
3. Submit Cloud Build job using `cloudbuild.yaml`

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `GCP_SA_KEY` | JSON key for a GCP service account with Cloud Run Admin + Cloud Build Editor roles |

### Workflow File

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloud Run
on:
  push: { branches: [main] }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Auth to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}
      - name: Submit Cloud Build
        run: gcloud builds submit --config=cloudbuild.yaml
```

---

## Environment Variables

| Variable | Set Where | Public/Secret | Purpose |
|---|---|---|---|
| `NODE_ENV` | Cloud Run env var | Public | Set to `production` for optimized builds |
| `GCP_PROJECT_ID` | Cloud Run env var | Public | GCP project ID for Vertex AI and Firebase |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `.env.production` (build-time) | Public | Firebase client SDK initialization |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `.env.production` (build-time) | Public | Firebase Auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `.env.production` (build-time) | Public | Firebase project identifier |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | `.env.production` (build-time) | Public | Google Maps JS API (HTTP-referrer restricted) |
| `GCP_SA_KEY` | GitHub Secrets | Secret | Service account key for CI/CD deployment |

### Security Notes

- **No `.env.local` in the Docker image.** The `Dockerfile` does not copy `.env.local` or `firebase-sa.json`. These files are excluded via `.gcloudignore` and `.dockerignore`.
- **Application Default Credentials (ADC)** are used for all server-side Google Cloud calls. Cloud Run automatically provides credentials via its service account — no JSON key files needed at runtime.
- **`NEXT_PUBLIC_*` variables** are baked into the JavaScript bundle at build time. They contain only public, non-secret values (Firebase config, Maps API key with referrer restrictions).

---

## Firestore Setup

### Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

Current rules in `firestore.rules`:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /constituencies/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /myths/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Seed Data (Optional)

If Firestore collections need to be populated:

```bash
python scripts/seed_firestore.py
```

Note: The current deployment uses static data embedded in page components for timeline and education content, so Firestore seeding is not required for core functionality.

---

## Troubleshooting

### 1. Build fails with TypeScript errors

**Symptom:** `gcloud run deploy` fails during the Docker build step with type errors.

**Fix:** Run `npm run build` locally first to catch TypeScript errors before deploying:

```bash
npm run build
```

Common causes:
- Unused imports flagged by ESLint (`no-unused-vars`)
- Type mismatches in shadcn/ui component props (e.g., `Select` `onValueChange` expects `string | null`)

### 2. Gemini API returns 404 (model not found)

**Symptom:** Chat or Myth Buster returns "Internal server error". Logs show `Publisher Model was not found`.

**Fix:** Ensure the model name in `lib/ai/gemini.ts` matches an available model in your region. The current working configuration:

```typescript
// lib/ai/gemini.ts
vertex_ai = new VertexAI({
  project: process.env.GCP_PROJECT_ID,
  location: 'us-central1'        // not asia-south1
});
return vertex_ai.getGenerativeModel({
  model: 'gemini-2.5-flash',     // currently available model
});
```

### 3. Environment variables not set correctly on Cloud Run

**Symptom:** App loads but AI features fail. Logs show `GCP_PROJECT_ID environment variable is not set`.

**Fix:** Verify environment variables are set as separate key-value pairs:

```bash
gcloud run services describe electiondosti \
  --region=asia-south1 \
  --format="yaml(spec.template.spec.containers[0].env)"
```

Each variable must appear as a distinct entry. If deploying manually, use:

```bash
--set-env-vars="NODE_ENV=production,GCP_PROJECT_ID=promptwars1-493604"
```
