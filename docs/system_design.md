# System Design Document

## 1. High-Level Architecture

The application follows a **Serverless / Backend-as-a-Service (BaaS)** architecture. It eliminates the need for a traditional custom backend server by leveraging Supabase for database and API needs, and Netlify for static frontend hosting.

### 1.1 Architectural Pattern
- **Client-Server (Thick Client)**: The frontend handles most logic (geolocation, speed testing, map rendering).
- **BaaS (Backend as a Service)**: Supabase provides the database, API endpoints (via PostgREST), and security policies.

### 1.2 Components

1.  **Frontend Client (Vercel/Netlify)**
    - Next.js Application (React).
    - Runs in the user's browser.
    - Manages application state and UI via React Hooks.
    - Communicates directly with Supabase.

2.  **Speed Test Engine (OpenSpeedTest)**
    - Embedded JavaScript module running in the browser.
    - Performs network throughput tests (Download/Upload).

3.  **Database & API (Supabase)**
    - **PostgreSQL**: Relational database storage.
    - **PostGIS**: Geospatial extension for location queries.
    - **REST API**: Auto-generated API over the database.
    - **Auth/Security**: Row Level Security (RLS) to manage access.

4.  **Map Service (Leaflet + OSM)**
    - **Leaflet.js**: Client-side rendering library.
    - **OpenStreetMap**: Tile provider for map visuals.

## 2. Data Flow

### 2.1 Speed Test Submission Flow
1.  **User Action**: User initiates test on Frontend.
2.  **Browser**: Requests Geolocation (Lat/Lng).
3.  **Engine**: OpenSpeedTest runs network checks.
4.  **User Input**: User selects ISP/Operator.
5.  **Submission**: Frontend sends POST request to Supabase `speed_tests` table.
6.  **Validation**: Supabase RLS checks if insert is allowed (public anonymous).
7.  **Storage**: Data persisted in PostgreSQL.

### 2.2 Map Visualization Flow
1.  **User Action**: User requests Map View.
2.  **Check**: Frontend checks `localStorage` for `hasCompleted` flag.
3.  **Query**: Frontend sends GET request to Supabase.
    - *Filter*: `ST_DWithin` (Geospatial radius).
    - *Filter*: Date range & Operator.
4.  **Response**: Supabase returns JSON array of test points.
5.  **Render**: Leaflet.js draws heatmap layers on top of OSM tiles.

## 3. Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js (React) | Component-based architecture, robust state management. |
| **Hosting** | Vercel / Netlify | Static/Serverless hosting, CD, SSL. |
| **Database** | Supabase (PostgreSQL) | Data persistence, relational data. |
| **Geospatial** | PostGIS | Spatial indexing and queries. |
| **Maps** | React-Leaflet | Interactive map rendering. |
| **Speed Test** | OpenSpeedTest | Network performance measurement. |

## 4. Deployment Architecture

- **Source Control**: GitHub (Main branch).
- **CI/CD**: Netlify auto-deploys on push to `main`.
- **Environment**:
    - Production: Live URL (Netlify).
    - Database: Managed Supabase instance.
