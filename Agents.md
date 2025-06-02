# Codex Guidelines

This repository does not currently include automated tests, but the code base uses TypeScript for the backend and Vue for the frontend. To keep the repository healthy, follow these steps whenever modifying code:

1. **Run linters and type checks**
   - `npm run lint --prefix frontend`
   - `npm run type-check --prefix frontend`
   - If you modify backend TypeScript code, ensure `npm run build --prefix backend` completes successfully.

2. **Coding standards**
   - Use Prettier and ESLint defaults. Do not introduce unused imports or commented out code.
   - Keep code self-contained and modular. Favor small functions with explicit types.

3. **Commit messages**
   - Use short, present-tense summaries (e.g. "Add login route").
   - Include a concise description when necessary.

4. **Clean repository**
   - Avoid committing build artifacts or `dist` folders.
   - Remove unnecessary logging and debug statements before committing.

