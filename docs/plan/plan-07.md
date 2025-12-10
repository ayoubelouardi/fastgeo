# Plan 7: Speed Test Logic Integration

## Goal
Capture the results from the OpenSpeedTest execution.

## Tasks
1.  Research and implement the event listener for OpenSpeedTest.
    -   OpenSpeedTest usually provides a callback or window event (e.g., `OnTestComplete`) when the test finishes.
2.  Update `SpeedTest` component to listen for this event.
3.  Extract `download`, `upload`, `ping`, and `jitter` values from the event data.
4.  Store these results in a local state or a global context.

## Verification
-   Run a speed test.
-   Verify that upon completion, the results are logged to the console or displayed in a temporary "Results" section on the page.
