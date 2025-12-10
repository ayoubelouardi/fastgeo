# Plan 8: Operator Selection Component

## Goal
Allow the user to select their Internet Service Provider.

## Tasks
1.  Create a `OperatorSelect` component.
2.  Implement a dropdown (`<select>`) with the required options:
    -   IAM
    -   Inwi
    -   Orange
    -   Other
3.  Add validation: The user must select an operator before they can submit the test results.
4.  Integrate this component into the Homepage flow (e.g., show it before or after the test).

## Verification
-   Verify the dropdown renders with correct options.
-   Verify the selected value is captured in the application state.
