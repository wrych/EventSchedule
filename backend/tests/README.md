# Backend Unit Tests

This directory contains unit tests executed via the Node.js test runner using `tsx`.
Each service has its own test file:

- `userService.test.ts`
- `eventService.test.ts`
- `migration.test.ts`

## Covered functionality

- User service: creating users, updating users and lookups
- Event service: creating events and retrieving them in sorted order
- Migration service: marking migrations as complete and checking their status

Run the tests from the repository root:

```bash
DB_DIALECT=sqlite DB_FILE=./var/db/test.sqlite npm run test --prefix backend
```
