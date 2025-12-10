# Plan 16: Unit Testing Setup

## Goal
Set up the testing environment and write basic unit tests.

## Tasks
1.  Install Jest and React Testing Library.
    ```bash
    npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
    ```
2.  Configure Jest for Next.js (create `jest.config.js` and `jest.setup.js`).
3.  Write unit tests for:
    -   `src/utils/supabase.ts` (mocking the client).
    -   `OperatorSelect` component (rendering and interaction).

## Verification
-   Run `npm run test`.
-   Verify tests pass.
