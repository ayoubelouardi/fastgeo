# Testing Specifications

## 1. Testing Strategy

The testing strategy focuses on ensuring the reliability of the speed test, the accuracy of geolocation, and the performance of the map visualization.

### 1.1 Levels of Testing
- **Unit Testing**: Logic verification for individual functions (e.g., data formatting, coordinate validation).
- **Integration Testing**: Verifying communication between Frontend and Supabase.
- **End-to-End (E2E) Testing**: Simulating full user flows from landing page to map view.
- **Performance Testing**: Benchmarking load times and map rendering.

## 2. Test Tools

| Type | Tool | Purpose |
|------|------|---------|
| **Unit/Integration** | **Jest + React Testing Library** | Component and logic testing. |
| **E2E** | **Cypress** | Browser-based automation testing. |
| **Performance** | **Lighthouse** | Web vitals and performance auditing. |
| **Security** | **Snyk / npm audit** | Dependency vulnerability scanning. |
| **Accessibility** | **axe DevTools** | WCAG compliance checking. |

## 3. Test Cases

### 3.1 Functional Test Cases (E2E)

| ID | Scenario | Expected Result |
|----|----------|-----------------|
| **TC-01** | User grants Location Permission | Map preview centers on user coordinates. |
| **TC-02** | User denies Location Permission | UI prompts for manual map click; default view shown. |
| **TC-03** | Complete Speed Test | Progress bar fills; Results (DL/UL) displayed > 0. |
| **TC-04** | Submit Data | POST request to Supabase returns 201 Created. |
| **TC-05** | Access Map (New User) | Map is hidden/locked; Redirect to Test. |
| **TC-06** | Access Map (Returning User) | Map loads immediately; `hasCompleted` flag is present. |
| **TC-07** | Filter Map by Operator | Map markers update to show only selected ISP. |

### 3.2 Performance Benchmarks

- **Speed Test Duration**: Must complete within 90 seconds.
- **Map Load Time**: < 3 seconds for 500 data points.
- **API Latency**: Supabase queries should return within 500ms (p95).
- **Lighthouse Score**: > 90 for Performance, Accessibility, and Best Practices.

### 3.3 Security & Privacy Tests

- **SQL Injection**: Verify Supabase client sanitizes inputs.
- **PII Check**: Verify no IP addresses or User IDs are sent in the POST payload.
- **RLS Verification**: Attempt to `DELETE` or `UPDATE` rows as an anonymous user (Should Fail/403).

## 4. Continuous Integration

- **Trigger**: On Pull Request to `main`.
- **Actions**:
    1.  Run Linter (ESLint).
    2.  Run Unit Tests (Jest).
    3.  Run Build Check.
