# ElectionDosti

*India's Multilingual AI-Powered Election Education Assistant*

[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?logo=firebase)](https://firebase.google.com/)
[![Vertex AI](https://img.shields.io/badge/Vertex%20AI-Gemini%202.5%20Flash-4285F4?logo=google-cloud)](https://cloud.google.com/vertex-ai)
[![Live URL](https://img.shields.io/badge/Live-Cloud%20Run-success)](https://electiondosti-229841118256.asia-south1.run.app)
[![Deploy](https://img.shields.io/badge/Deploy-Cloud%20Build-blue?logo=google-cloud)](https://cloud.google.com/build)

> Submitted for **PromptWars 2025** — Google for Developers x Hack2Skill

---

## Live Demo

**https://electiondosti-229841118256.asia-south1.run.app**

Open on any device — desktop, tablet, or mobile. Works best on Chrome/Edge for full voice features.

---

## The Problem We're Solving

- **900M+ eligible voters** in India, yet voter turnout rarely exceeds 67% — awareness is a key gap
- **22 official languages** create barriers to accessing election information uniformly
- **Misinformation** spreads faster on WhatsApp than official ECI updates can counter it
- **Visually impaired and low-literacy citizens** are excluded by text-heavy government portals

ElectionDosti bridges these gaps with an AI companion that speaks the voter's language — literally.

---

## What ElectionDosti Does

1. **AI Chat Assistant** — Voice + text multi-turn conversation powered by Gemini 2.5 Flash. Auto-detects language and streams responses in real time.
2. **Election Education** — 10 comprehensive topic guides covering voter registration, EVMs, NOTA, Model Code of Conduct, and more. Audio narration available.
3. **AI Myth Buster** — Submit any election claim; Gemini classifies it as TRUE, FALSE, or PARTIALLY TRUE with ECI-sourced explanations.
4. **Election Timeline** — Official 2026 State Assembly Election schedule for Tamil Nadu, West Bengal, Kerala, Assam, and Puducherry with phase-wise dates.
5. **Booth Finder** — Google Maps integration showing nearby polling stations with one-tap directions via geolocation.
6. **Voice & Accessibility** — Web Speech API for speech-to-text, Google Cloud TTS for audio output. Designed for voice-first interaction.

---

## Chosen Vertical: Election Process Education

ElectionDosti directly addresses the Election Process Education vertical by making authoritative ECI information accessible to every Indian citizen through conversational AI and voice-first design. The app transforms complex electoral procedures into simple, multilingual, interactive experiences.

---

## How It Works

```
1. User speaks or types a query in any of 6 Indian languages
2. Web Speech API transcribes voice; language is auto-detected
3. Gemini 2.5 Flash classifies intent and routes to the appropriate module
4. Module generates AI response or fetches cached education content
5. Response streams back in real time; Cloud TTS plays audio in user's language
```

```
User Query Flow:

  [Voice/Text Input]
        |
        v
  [Language Detection]
        |
        v
  [Intent Classification] ---> EDUCATION ---> Static Content + TTS
        |                 ---> MYTH -------> Gemini Fact-Check
        |                 ---> TIMELINE ---> Phase Data Lookup
        |                 ---> BOOTH ------> Maps API + Geolocation
        v
  [Gemini 2.5 Flash] ---> Streaming Response ---> TTS Playback
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full system design.

---

## Architecture at a Glance

ElectionDosti is a Next.js 14 App Router application deployed as a single Docker container on Google Cloud Run. All AI and data operations happen server-side through API routes, keeping secrets safe and responses fast.

```
+------------------+       HTTPS       +-------------------------+
|   Browser        | ----------------> |  Cloud Run (Next.js)    |
|   React UI       |                   |  API Routes:            |
|   Web Speech API |                   |   /api/chat             |
|   IndexedDB      | <---------------- |   /api/myth             |
+------------------+   Streamed JSON   |   /api/tts              |
                                       +-----+-------+-----------+
                                             |       |
                              +--------------+       +----------+
                              v                                  v
                    +------------------+              +------------------+
                    |  Vertex AI       |              |  Firebase        |
                    |  Gemini 2.5 Flash|              |  Firestore       |
                    +------------------+              +------------------+
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full architecture diagram and request lifecycle.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + React 18 + TypeScript 5 |
| Styling | Tailwind CSS 3 + shadcn/ui components |
| State | Zustand for client state management |
| Validation | Zod schemas for API input validation |
| AI / LLM | Vertex AI Gemini 2.5 Flash via `@google-cloud/vertexai` |
| Database | Firebase Firestore (server-side via `firebase-admin`) |
| Voice Input | Web Speech API (browser-native) |
| Voice Output | Google Cloud Text-to-Speech REST API |
| Maps | Google Maps JavaScript API via `@vis.gl/react-google-maps` |
| i18n | `next-intl` for multilingual routing (`/en`, `/hi`, `/ta`, `/te`, `/kn`, `/bn`) |
| Offline | Dexie.js (IndexedDB wrapper) for client-side caching |
| Deployment | Docker + Google Cloud Build + Cloud Run (asia-south1) |
| CI/CD | GitHub Actions: auto-deploy to Cloud Run on push to `main` |

---

## Google Services Used

**Compute & Deploy:**
- Google Cloud Run — hosts the containerized Next.js application
- Google Cloud Build — auto-builds Docker images on every push
- Google Artifact Registry — stores built Docker images

**AI & ML:**
- Vertex AI Gemini 2.5 Flash — conversational AI, intent classification, myth busting
- Google Cloud Speech-to-Text — server-side STT fallback
- Google Cloud Text-to-Speech — WaveNet neural voices for 6 Indian languages
- Google Cloud Translation API — language detection and translation fallback

**Data & Auth:**
- Firebase Firestore — NoSQL database for election data
- Firebase Authentication — anonymous auth for frictionless access
- Firebase Cloud Functions — scheduled data sync jobs

**Engagement:**
- Firebase Cloud Messaging — push notifications for election updates
- Firebase Remote Config — feature flags without redeployment
- Firebase Analytics (GA4) — usage and language distribution tracking

**Maps:**
- Google Maps JavaScript API — booth finder map rendering and directions
- Google Places API — geocoding for polling station proximity search

**Operations:**
- Google Cloud Logging — application and request logs
- Google Cloud Monitoring — latency, error rate, and health dashboards

---

## Key Differentiators

- **Voice-first design** — built for visually impaired and rural users who prefer speaking over typing
- **AI Myth Busting** — real-time fact-checking of election claims with ECI-sourced explanations
- **Offline-first architecture** — IndexedDB caching ensures education content works without internet
- **6 Indian languages** — English, Hindi, Tamil, Telugu, Kannada, Bengali with auto-detection
- **Real-time streaming** — Gemini responses appear word-by-word for instant feedback

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/vishnusvault/ElectionDosti.git
cd ElectionDosti

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase and Google Cloud credentials

# Run the development server
npm run dev
```

Open http://localhost:3000 in your browser. See [DEPLOYMENT.md](./DEPLOYMENT.md) for full setup instructions.

---

## Project Structure

```
ElectionDosti/
├── app/                    # Next.js 14 App Router
│   ├── [locale]/           # i18n routing (en, hi, ta, te, kn, bn)
│   │   ├── page.tsx        # Home dashboard
│   │   ├── chat/           # AI Chat interface
│   │   ├── education/      # Election education topics
│   │   ├── myth-buster/    # Myth fact-checker
│   │   ├── timeline/       # Election schedule
│   │   └── booth/          # Polling booth finder
│   └── api/                # Server-side API routes
│       ├── chat/           # Gemini streaming chat
│       ├── myth/           # Myth classification
│       ├── tts/            # Text-to-speech synthesis
│       ├── stt/            # Speech-to-text fallback
│       └── timeline/       # Election data queries
├── components/             # React components
│   ├── ui/                 # shadcn/ui primitives
│   ├── chat/               # Chat UI components
│   ├── myth/               # Myth buster components
│   ├── booth/              # Map components
│   └── education/          # Education card components
├── lib/                    # Shared libraries
│   ├── ai/                 # Gemini wrapper, prompts, intent router
│   ├── firebase/           # Firebase Admin SDK + client init
│   ├── voice/              # Speech recognition + TTS client
│   ├── db/                 # Dexie.js IndexedDB schema
│   ├── store/              # Zustand state stores
│   └── types/              # TypeScript type definitions
├── Dockerfile              # Multi-stage Docker build
├── cloudbuild.yaml         # Cloud Build configuration
└── firestore.rules         # Firestore security rules
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed module design.

---

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design, request flow, and data model
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Cloud Run setup, CI/CD, and environment variables
- [SECURITY.md](./SECURITY.md) — Security architecture and best practices
- [CONTRIBUTING.md](./CONTRIBUTING.md) — How to contribute

---

## Evaluation Criteria Mapping

| Criterion | Implementation | Details |
|---|---|---|
| Innovation | Voice-first multilingual AI chat with real-time Gemini streaming | See AI Chat + Voice features |
| Google Services | 16+ Google Cloud and Firebase services integrated | See "Google Services Used" above |
| Impact | Addresses 900M+ voters across language and accessibility barriers | See "The Problem" section |
| Technical Depth | Streaming AI, intent classification, offline caching, PWA | See [ARCHITECTURE.md](./ARCHITECTURE.md) |
| Security | ADC auth, Zod validation, Firestore rules, API key restrictions | See [SECURITY.md](./SECURITY.md) |
| Deployment | Fully automated CI/CD via GitHub Actions + Cloud Build + Cloud Run | See [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Code Quality | TypeScript strict mode, ESLint, conventional commits, modular architecture | See [CONTRIBUTING.md](./CONTRIBUTING.md) |

---

## Assumptions & Limitations

- ECI public data is referenced for educational purposes only — this is not an official ECI application
- Voice input requires a browser supporting Web Speech API (Chrome 90+, Edge 90+)
- Full AI features require internet connectivity; offline mode covers cached education content
- Election timeline data is based on officially announced 2026 State Assembly Election dates
- The app currently supports 6 languages: English, Hindi, Tamil, Telugu, Kannada, and Bengali

---

## Acknowledgements

- **Google for Developers** and **Hack2Skill** for organizing PromptWars 2025
- **Election Commission of India** — authoritative source for all election data and processes
- **shadcn/ui** — accessible component library built on Radix UI primitives
