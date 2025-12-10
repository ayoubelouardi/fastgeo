# Plan 6: Speed Test Component UI

## Goal
Create the visual interface for the speed test.

## Tasks
1.  Create a `SpeedTest` component in `src/components/SpeedTest.tsx`.
2.  Embed the OpenSpeedTest tool.
    -   You can use an `<iframe>` pointing to a hosted OpenSpeedTest instance or a local self-hosted version if available/preferred.
    -   *Note*: For the MVP, using the standard OpenSpeedTest embed or iframe approach is recommended.
3.  Add UI elements around the test:
    -   "Start Test" button (if not using the iframe's native start).
    -   Progress indicators (if accessible via API, otherwise rely on iframe UI).
    -   "Cancel" button.

## Verification
-   Verify the OpenSpeedTest interface loads correctly on the Homepage.
-   Verify it is responsive on mobile screens.
