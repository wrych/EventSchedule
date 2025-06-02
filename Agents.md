# Codex Guidelines

This repository includes backend unit tests using Node's test runner. To keep the repository healthy, follow these steps whenever modifying code:

1. **Create or update tests first**

   - Add tests covering new functionality or bug fixes before implementing changes.
   - Run `npm run test --prefix backend` to execute the backend tests.
2. **Run linters, type checks, and builds**

   - `npm run lint` (runs linting in both `backend` and `frontend`)
   - `npm run type-check --prefix frontend`
   - `npm run build`

3. **Coding standards**

   - Use Prettier and ESLint defaults. Do not introduce unused imports or commented out code.
   - Keep code self-contained and modular. Favor small functions with explicit types.

4. **Commit messages**

   - Use short, present-tense summaries (e.g. "Add login route").
   - Include a concise description when necessary.

5. **Clean repository**
   - Remove unnecessary logging and debug statements before committing.
