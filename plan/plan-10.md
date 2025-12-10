# Plan 10: Access Control (Test-First Gate)

## Goal
Restrict access to the Map page until the user has contributed a test.

## Tasks
1.  Implement logic to set a `localStorage` item `hasCompleted` to `true` upon successful submission in Plan 9.
2.  Create a route guard or check in `src/app/map/page.tsx`.
    -   Use `useEffect` to check `localStorage.getItem('hasCompleted')`.
    -   If false, redirect to `/` with a message "Please run a speed test to view the map."
3.  Add a "View Map" button on the Homepage that is only enabled/visible after submission.

## Verification
-   Clear localStorage and try to access `/map`. Verify redirection to `/`.
-   Complete a test and submit. Verify `hasCompleted` is in localStorage.
-   Access `/map`. Verify access is granted.
