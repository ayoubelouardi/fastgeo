# Frontend Specifications

## 1. Technology Stack

- **Framework**: Next.js (React)
- **Language**: TypeScript (Recommended) or JavaScript
- **Styling**: Tailwind CSS (Recommended) or CSS Modules
- **Map Library**: React-Leaflet (Wrapper for Leaflet.js)
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Build Tool**: Webpack/Turbopack (Built-in Next.js)

## 2. Application Structure

### 2.1 Pages (Routes)
- `/` (Home): Landing page, Speed Test interface.
- `/map` (Map View): Global heatmap (Protected route).
- `/privacy` (Privacy Policy): Static content.

### 2.2 Key Components
- `Layout`: Main wrapper (Navbar, Footer).
- `SpeedTest`: Component wrapping the OpenSpeedTest logic.
- `MapContainer`: React-Leaflet map instance with TileLayer and HeatmapLayer.
- `OperatorSelect`: Dropdown component for ISP selection.
- `ConsentBanner`: GDPR compliance modal.

## 3. User Interface (UI) Flows

### 3.1 Landing Page
1.  **Hero Section**: Title, brief description, "Start Test" button.
2.  **Consent Modal**: On first load, check `localStorage`. If missing, show modal.
3.  **Test Interface**:
    - Hidden initially.
    - Revealed when "Start Test" is clicked.
    - Shows `SpeedTest` component (Gauge/Progress bar).
    - Shows `OperatorSelect` (Required before submission).

### 3.2 Map Page
1.  **Protection**: `useEffect` checks `localStorage.getItem('hasCompleted')`. Redirect to `/` if false.
2.  **Map View**: Full-screen map.
3.  **Controls Overlay**: Floating panel for Filters (Date Range, Operator).

## 4. State Management

### 4.1 Global State (Context API or Zustand)
- `userLocation`: { lat, lng, accuracy }
- `testResults`: { download, upload, ping }
- `hasCompletedTest`: boolean (synced with localStorage)

### 4.2 Local State
- Form inputs (Operator selection).
- Map viewport (Zoom level, Center).
- Loading states (isTesting, isSubmitting).

## 5. External Integrations

### 5.1 Supabase Client
- Initialize `createClient` in a utility file (`utils/supabase.js`).
- Functions: `submitTestResult()`, `fetchMapData()`.

### 5.2 OpenSpeedTest
- Integration via `<iframe>` or direct JS implementation if available as an NPM package.
- Event listeners for `onEnd` to capture results.

## 6. Performance Requirements

### 3.1 State Management
- **`hasCompleted`**: Boolean flag stored in `localStorage`.
    - `false` (default): Blocks access to Map View.
    - `true`: Set after successful Supabase POST. Unlocks Map View.
- **Session Data**: Temporary storage of test results before submission.

### 3.2 Geolocation Handler
1.  Call `navigator.geolocation.getCurrentPosition`.
2.  **Success**: Update Map Preview center.
3.  **Error/Deny**: Show manual selection instruction ("Click on the map to set location").

### 3.3 Speed Test Integration
- Load OpenSpeedTest script.
- Listen for `OnEnd` or `onTestComplete` event.
- Extract `download`, `upload`, `ping`, `jitter` variables.

### 3.4 Map Rendering
- Initialize Leaflet map.
- Fetch data from Supabase based on current viewport bounds (optional optimization) or global fetch.
- Render **Heatmap Layer** or **Cluster Markers** depending on density.
- **Color Coding**:
    - Green: > 50 Mbps
    - Yellow: 20 - 50 Mbps
    - Orange: 5 - 20 Mbps
    - Red: < 5 Mbps

## 4. Performance Requirements
- **First Contentful Paint (FCP)**: < 1.0s.
- **Map Interactive**: < 3.0s with 500 points.
- **Bundle Size**: Keep initial load minimal (lazy load Leaflet/Supabase if possible).

## 5. Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Browsers (iOS Safari, Chrome for Android).
