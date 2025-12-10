# Plan 17: E2E Testing (Cypress)

## Goal
Set up End-to-End testing to verify the full user flow.

## Tasks
1.  Install Cypress.
    ```bash
    npm install --save-dev cypress
    ```
2.  Initialize Cypress (`npx cypress open`).
3.  Write a test spec `speed_test_flow.cy.ts`:
    -   Visit Homepage.
    -   Mock Geolocation.
    -   Select Operator.
    -   Simulate Speed Test completion (if possible, or mock the result).
    -   Submit.
    -   Verify redirection/access to Map.

## Verification
-   Run `npx cypress run`.
-   Verify the scenario passes.
