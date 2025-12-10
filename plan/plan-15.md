# Plan 15: GDPR Consent Banner

## Goal
Ensure compliance with privacy regulations.

## Tasks
1.  Create a `ConsentBanner` component.
2.  Add text explaining that anonymous location and speed data will be stored.
3.  Add "Accept" and "Decline" buttons.
4.  Logic:
    -   Show banner if no consent choice is stored in `localStorage`.
    -   If "Decline", block the speed test submission or warn the user.
    -   If "Accept", store consent in `localStorage` and hide banner.

## Verification
-   Clear localStorage.
-   Verify banner appears on load.
-   Verify clicking Accept hides it and stores the preference.
