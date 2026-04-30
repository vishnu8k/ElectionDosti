# ElectionDosti — Contributing

Guidelines for contributing to ElectionDosti. This is a hackathon project — we keep things lightweight.

---

## Quick Start

```bash
git clone https://github.com/vishnusvault/ElectionDosti.git
cd ElectionDosti
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

---

## Branch Naming

Use prefixed branch names:

- `feature/add-voice-navigation` — new functionality
- `fix/chat-streaming-error` — bug fixes
- `chore/update-dependencies` — maintenance tasks
- `docs/update-architecture` — documentation changes

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(chat): add streaming response indicator
fix(myth): handle empty claim input gracefully
chore(deps): bump next-intl to 3.x
docs: update deployment instructions
```

Prefix options: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`.

---

## Code Style

- Run `npm run lint` before committing
- TypeScript strict mode — avoid `any` types
- Use shadcn/ui components for UI primitives
- Server-side code in `app/api/` and `lib/ai/` — never import these in client components
- Client components must include `'use client'` directive

---

## Testing

```bash
# Run unit tests
npm run test

# Run linter
npm run lint
```

Write tests for utility functions and API route handlers. Test files go in `tests/unit/`.

---

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes and commit with conventional commit messages
3. Run `npm run lint` and `npm run test` locally
4. Open a PR against `main` and fill out the PR template
5. Wait for CI checks to pass
6. Request review from a team member

See [SECURITY.md](./SECURITY.md) to ensure no secrets are committed.
