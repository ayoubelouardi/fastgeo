# Software Specification Document: Global Internet Speed Test Map

## 1. Introduction

### 1.1 Purpose

Privacy-first, crowdsourced internet speed testing platform with geolocation mapping. Users test speed, contribute anonymously (location, timestamp, operator only), and visualize aggregate speeds by region and ISP globally.

### 1.2 Intended Audience

- Development team (frontend/backend engineers)
- Stakeholders (product owner, project manager)
- QA team

### 1.3 Scope

**MVP Prototype includes:**
- Speed test via OpenSpeedTest (embedded open-source)
- Geolocation capture + ISP selection
- Anonymous data storage (Supabase)
- Interactive map with operator/date filters
- Test-first access control

**Explicitly excluded:**
- User accounts, authentication
- Advanced metrics (latency, jitter)
- Historical trends, analytics
- Mobile app, third-party API

### 1.4 Key Terms

- **ISP/Operator**: Internet Service Provider (IAM, Inwi, Orange, etc.)
- **Geolocation**: User's latitude/longitude coordinates
- **Mbps**: Megabits per second
- **Heatmap**: Color-coded geographic representation of average speeds
- **OpenSpeedTest**: Open-source speed test tool (https://github.com/openspeedtest/Speed-Test)
- **Supabase**: PostgreSQL database with geospatial support (PostGIS)
- **Netlify**: Static hosting for frontend

### 1.5 References

[1] OpenSpeedTest: https://github.com/openspeedtest/Speed-Test
[2] Supabase: https://supabase.com
[3] Netlify: https://netlify.com
[4] Leaflet.js: https://leafletjs.com
[5] PostGIS: https://postgis.net
[6] GDPR: https://gdpr-info.eu/

---

## 2. Overall Description

### 2.1 Product Perspective

Standalone web application: no backend server, no user accounts. Frontend hosted on Vercel or Netlify; data stored in Supabase PostgreSQL. Speed testing via embedded OpenSpeedTest; mapping via Leaflet.js (React Leaflet) + OpenStreetMap.

**Flow:** User → Next.js Frontend → OpenSpeedTest → Supabase API → Database

No third-party services required beyond Hosting and Supabase.

### 2.2 Product Functions

#### Core Functions

1. **Speed Test**: OpenSpeedTest measures download/upload; results displayed in seconds.
2. **Geolocation**: HTML5 API captures lat/lng; user confirms or adjusts on map.
3. **Operator Selection**: Dropdown per region (Morocco: IAM/Inwi/Orange); falls back to "Other."
4. **Data Storage**: Supabase stores only {lat, lng, timestamp, operator, download_mb_s, upload_mb_s}.
5. **Map View**: Leaflet heatmap shows aggregate speeds by region; filter by operator/date.
6. **Test-First Gate**: Map hidden unless localStorage flag `hasCompleted=true` is set.

### 2.3 Target Users

- **Travelers**: Check speed availability before visiting new locations.
- **Remote Workers**: Verify connectivity in specific areas.
- **General Public**: Curious about internet infrastructure.

**Assumptions**: Users have modern browsers, GPS-enabled devices, consent to share anonymized location data.

### 2.4 Constraints

| Category | Constraint |
|----------|-----------|
| **Technical** | Next.js + Supabase stack only; no custom backend server; OpenSpeedTest JS embedded |
| **Browser** | Modern ES6+ support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+) |
| **Geolocation** | GPS accuracy ±25-100m; outdoor/indoor variance |
| **GDPR** | EU users require consent banner; store only anonymized data |
| **Timeline** | 3-week prototype sprint |
| **Scalability** | Netlify/Supabase free tier sufficient for MVP |

### 2.5 Assumptions & Dependencies

**Assumptions:**
- Users grant geolocation permission
- Users select correct ISP from dropdown
- Sufficient data accumulates for meaningful aggregates

**Dependencies:**
- OpenSpeedTest GitHub (embedded JS)
- Supabase PostgreSQL + PostGIS for geospatial queries
- Leaflet.js + OpenStreetMap
- Browser Geolocation API

---

## 3. Functional Requirements

### 3.1 Speed Test (OpenSpeedTest Integration)

**FR-1: Test Execution**
- Embed OpenSpeedTest v2.0 (GitHub: openspeedtest/Speed-Test)
- Measure download/upload; display results in Mbps
- Test duration: <90 seconds
- Hook `onTestComplete` callback to capture results

**FR-2: Progress Display**
- Show real-time progress bar and current speed estimate
- Update every 1-2 seconds

**FR-3: Test Cancellation**
- Cancel button stops test; discards results; no data saved

### 3.2 Geolocation

**FR-4: Location Capture**
- HTML5 Geolocation API requests user permission
- Display lat/lng + accuracy (±m)
- Allow user to confirm or adjust on interactive map

**FR-5: Fallback**
- If GPS denied/unavailable: user manually selects location on map
- Graceful error handling

### 3.3 ISP/Operator Selection

**FR-6: Operator Dropdown**
- Country-specific dropdown (Morocco: IAM/Inwi/Orange/Other)
- User selects operator before test submission
- Required field

**FR-7: Fallback**
- If operator undetectable: display "Other"; allow manual entry

### 3.4 Data Storage & Privacy

**FR-8: Anonymous Data Submission**
- Supabase stores only: {lat, lng, timestamp, operator, download_mb_s, upload_mb_s}
- No IP, device ID, user agent, or personal data collected
- POST via Supabase JS client (RLS enforces public insert)

**FR-9: GDPR Consent Banner**
- Display for EU users: "We store anonymized location + operator data only"
- Accept/Decline buttons; test blocked if declined
- Privacy policy link provided

**FR-10: Data Retention**
- Retention policy: 24 months; aggregate data published; raw entries anonymized

### 3.5 Map Visualization

**FR-11: Interactive Map**
- Leaflet.js + OpenStreetMap; zoom/pan; responsive design
- Loads <3 seconds with 500+ results

**FR-12: Speed Display**
- Heatmap by 1km² grid cells; colors represent average speed (Green >50 Mbps, Red <5 Mbps)
- Click cell for details: count, average, operators

**FR-13: Operator Filter**
- Checkbox list to filter by operator; multiple select allowed; updates map in real-time

**FR-14: Date Range Filter**
- Dropdown preset: "Last 7 Days", "Last 30 Days", "Last 90 Days"; filters data dynamically

### 3.6 Access Control

**FR-15: Test-First Gate**
- localStorage flag `hasCompleted=true` set after successful submission
- Homepage: CTA "Start Speed Test"
- Map hidden behind gate: accessible only after test completion
- Returning user: map auto-loads if flag persists

**FR-16: Session Persistence**
- localStorage persists flag across page reloads
- Flag clears on browser cache clear; expires after 7 days (optional)

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Requirement | Target | Notes |
|-------------|--------|-------|
| Speed test duration | <90 seconds | Download + upload |
| Map load time | <3 seconds | 500+ results |
| API response (p95) | <500ms | Supabase queries |
| Browser memory | <100MB | No memory leaks |
| FCP / LCP | <1s / <2.5s | Lighthouse scores |

### 4.2 Reliability & Availability

- **Test submission**: 99% success rate; auto-retry on network failure (3 attempts)
- **Data integrity**: Supabase RLS + constraints prevent duplicates; no data loss
- **Uptime**: 99.5% (Netlify + Supabase SLA)
- **Monitoring**: Sentry error tracking; UptimeRobot alerts

### 4.3 Security

- **HTTPS/TLS**: All data encrypted in transit; Netlify + Supabase provide HTTPS
- **Input Validation**: Client + Supabase RLS; validate coordinates, operator, speeds
- **Anonymous Data**: No IP, device ID, user agent stored; max privacy
- **CORS**: Supabase RLS restricts public insert to anonymous users only
- **Rate Limiting**: Supabase enforces <100 requests/minute per IP

### 4.4 Usability & Accessibility

- **Responsive**: Mobile (<768px) / tablet / desktop; touch-friendly (44x44px buttons)
- **Accessibility**: WCAG 2.1 AA; semantic HTML; 4.5:1 contrast; keyboard navigation
- **Feedback**: Loading indicator during test; success/error messages; clear CTAs
- **Onboarding**: Landing page explains purpose; simple "Start Test" CTA; FAQ section

### 4.5 Compatibility

- **Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **OS**: Windows 10/11, macOS 11+, iOS 14+, Android 10+
- **Graceful Degradation**: No ES6 polyfills needed (drop support for IE11)

---

## 5. System Architecture

### 5.1 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Next.js (React); Tailwind CSS |
| **Speed Test** | OpenSpeedTest v2.0 (embedded from GitHub) |
| **Map** | React-Leaflet + OpenStreetMap |
| **Hosting** | Vercel / Netlify (static/serverless) |
| **Database** | Supabase PostgreSQL + PostGIS geospatial queries |
| **Client SDK** | Supabase JS (@supabase/supabase-js) |
| **Monitoring** | Sentry error tracking; UptimeRobot uptime |
| **Testing** | Cypress for E2E; Jest + React Testing Library for unit tests |

**No backend server required.** Frontend queries Supabase directly via Row Level Security (public insert).

### 5.2 Architecture Flow

Next.js Frontend (React)
       ↓
OpenSpeedTest (embedded)
       ↓
Geolocation API (browser)
       ↓
User selects operator
       ↓
Supabase JS Client POST → speed_tests table (RLS: public insert)
       ↓
Supabase PostgreSQL + PostGIS
       ↓
Leaflet map queries Supabase (ST_DWithin for geospatial)
       ↓
Heatmap renders per grid cell (aggregated speeds)

**No backend server.** Frontend directly inserts into Supabase via Row Level Security.

### 5.3 Database Schema (Supabase PostgreSQL + PostGIS)

**Enable PostGIS:**
CREATE EXTENSION postgis;

**Table: speed_tests**
CREATE TABLE speed_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location GEOGRAPHY(POINT, 4326),  -- PostGIS geospatial column
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  operator TEXT NOT NULL,
  download_mb_s NUMERIC NOT NULL,
  upload_mb_s NUMERIC NOT NULL
);

CREATE INDEX idx_location ON speed_tests USING GIST (location);
CREATE INDEX idx_timestamp ON speed_tests(timestamp);
CREATE INDEX idx_operator ON speed_tests(operator);

-- RLS: Public insert (anonymous users), authenticated read (admin)
ALTER TABLE speed_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert" ON speed_tests FOR INSERT WITH CHECK (true);

**Map Query Example (Leaflet frontend):**
// Query Supabase for points within 10km of user location
const { data } = await supabase
  .from('speed_tests')
  .select('*')
  .gte('timestamp', sevenDaysAgo)
  .eq('operator', selectedOperator)
  .filter('location', 'st_dwithin', `(${lng},${lat})::geography, 10000`);

---

## 6. Use Cases

**UC-1: New User Tests Speed**
1. Homepage → "Start Speed Test" CTA
2. Browser requests GPS permission; user grants
3. Geolocation returns lat/lng
4. User confirms location on map or adjusts
5. Selects operator (IAM/Inwi/Orange/Other) from dropdown
6. OpenSpeedTest runs: downloads/uploads measured
7. Results displayed: 45 Mbps down, 12 Mbps up
8. Data POST to Supabase (lat, lng, timestamp, operator, speeds)
9. localStorage flag set: `hasCompleted=true`
10. Map loads; heatmap shows local speeds; user filters by operator
11. User sees average 48 Mbps for IAM in region

**UC-2: Returning User Views Map**
1. User revisits homepage
2. localStorage flag detected: `hasCompleted=true`
3. CTA: "View Speed Map"
4. Map loads with last tested location
5. Date filter: "Last 7 Days"
6. Operator filter: IAM, Inwi
7. Heatmap updates; user observes trend (speeds improving)

**Fallback:** GPS denied → user manually selects location on map

---

## 7. UI Layout (Concise)

**Page 1: Homepage**
- Logo + title: "Global Speed Test Map"
- Privacy badge: "✓ Anonymous: Location + Operator Only"
- CTA button: "Start Speed Test" (primary color)
- Links: [Privacy Policy] [FAQ]

**Page 2: Speed Test**
- Map embed (small): show current location + adjust
- Operator dropdown: [Select ISP]
- Button: "Start Test"
- Progress during test: progress bar, current Mbps, elapsed time
- Button: Cancel Test

**Page 3: Results**
- Summary card: Download/Upload speeds + location + operator + timestamp
- Regional average (same operator): "Average in your area: 48 Mbps"
- CTA buttons: [View Map] [Run Another Test]

**Page 4: Map (Test-Gated)**
- Leaflet map (full screen)
- Top bar filters:
  - Operator checkboxes: ☑ IAM ☑ Inwi ☑ Orange ☑ Other
  - Date dropdown: [Last 7 Days ▼] [Last 30 Days] [Last 90 Days]
- Heatmap: 1km² grid cells, color by speed (Green >50, Yellow 20-50, Orange 5-20, Red <5)
- Click cell: tooltip shows average speed, count, operator breakdown
- Zoom/pan controls
- Legend (bottom-right)

---

## 8. Deployment

| Component | Platform | Notes |
|-----------|----------|-------|
| **Frontend** | Netlify | Static hosting; auto HTTPS; free tier |
| **Database** | Supabase | PostgreSQL + PostGIS; free tier: 500MB |
| **Env Vars** | Netlify secrets | VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY |
| **Monitoring** | Sentry | Error tracking; free tier |
| **Uptime** | UptimeRobot | Ping every 5min; alerts on downtime |

**Deployment Flow:** Git push → Netlify builds/deploys → Supabase APIs ready

---

## 9. Testing

| Type | Framework | Scope |
|------|-----------|-------|
| **Unit** | Jest | Geolocation, validation, map filters |
| **Integration** | Jest | Frontend → Supabase POST/GET |
| **E2E** | Cypress | Full flow: test → results → map; mobile responsive |
| **Performance** | Lighthouse | FCP <1s, LCP <2.5s, speed test <90s |
| **Security** | npm audit, Snyk | Dependency scanning; no secrets in code |
| **Accessibility** | axe DevTools | WCAG 2.1 AA; keyboard nav; screen reader |

---

## 10. Launch Checklist

- [ ] OpenSpeedTest embedded; download/upload measured in <90s
- [ ] Geolocation captures lat/lng; fallback to manual map click
- [ ] Operator dropdown (Morocco: IAM/Inwi/Orange/Other)
- [ ] Supabase stores only: lat, lng, timestamp, operator, speeds (no IP/device ID)
- [ ] GDPR banner displays for EU users
- [ ] Map loads <3s with 500+ test results
- [ ] Operator + date filters functional
- [ ] localStorage gate: map hidden until `hasCompleted=true`
- [ ] Chrome, Firefox, Safari, Edge (latest 2 versions) supported
- [ ] Fully responsive: mobile/tablet/desktop
- [ ] WCAG 2.1 AA: axe audit <3 issues
- [ ] Sentry error tracking active
- [ ] Netlify + Supabase deployed; custom domain HTTPS
- [ ] Privacy policy + FAQ published

---

## 11. Project Timeline (3 Weeks)

| Week | Deliverables |
|------|--------------|
| **Week 1** | OpenSpeedTest integration; Supabase schema + RLS; geolocation module; operator dropdown |
| **Week 2** | Leaflet map; heatmap rendering; operator/date filters; test-gate localStorage logic |
| **Week 3** | GDPR banner; Privacy policy; Sentry setup; E2E testing; Netlify + Supabase deploy; launch |

---

## 12. Glossary

| Term | Definition |
|------|-----------|
| **Aggregate Data** | Averaged speeds per geographic cell |
| **Geolocation** | User's GPS coordinates (lat/lng) |
| **Heatmap** | Color-coded grid representing speed intensity |
| **ISP/Operator** | Internet Service Provider |
| **Mbps** | Megabits per second |
| **OpenSpeedTest** | Open-source speed test tool |
| **PostGIS** | PostgreSQL geospatial extension |
| **RLS** | Row Level Security (Supabase) |
| **Supabase** | PostgreSQL-as-a-Service with built-in APIs |

---

## Future Enhancements (v2+)

- User accounts for test history
- Advanced metrics: latency, jitter, packet loss
- Historical trends and analytics
- Public API for researchers
- Mobile-native apps
- Crowdsourced alerts on speed degradation

---

## References

[1] OpenSpeedTest: https://github.com/openspeedtest/Speed-Test
[2] Supabase: https://supabase.com
[3] Netlify: https://netlify.com
[4] Leaflet.js: https://leafletjs.com
[5] PostGIS: https://postgis.net
[6] GDPR: https://gdpr-info.eu/
