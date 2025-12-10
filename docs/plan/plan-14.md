# Plan 14: Map Filters

## Goal
Allow users to filter the map data.

## Tasks
1.  Create a `MapFilters` component (floating overlay on the map).
2.  Add UI controls:
    -   **Date Range**: Dropdown (Last 7 days, 30 days, All time).
    -   **Operator**: Checkboxes for IAM, Inwi, Orange, Other.
3.  Update the `fetchMapData` function (or the state filtering logic) to respect these filters.
4.  Trigger a re-fetch or re-render when filters change.

## Verification
-   Select "Last 7 days". Verify older data disappears.
-   Uncheck an operator. Verify their data points disappear.
