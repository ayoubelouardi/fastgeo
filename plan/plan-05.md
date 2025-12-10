# Plan 5: Geolocation Implementation

## Goal
Implement the logic to capture the user's geographic location.

## Tasks
1.  Create a custom hook `useGeolocation` in `src/hooks/useGeolocation.ts`.
2.  Implement `navigator.geolocation.getCurrentPosition` logic.
3.  Handle states: `loading`, `error` (denied/unavailable), and `success` (coordinates).
4.  Create a `GeolocationPrompt` component to display the status or request permission.
5.  Integrate this hook into the Homepage to test coordinate capture.

## Verification
-   On the homepage, verify the browser asks for location permission.
-   Verify that allowing permission displays the latitude/longitude.
-   Verify that denying permission shows an error state.
