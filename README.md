# FieldOps Pro PWA

Offline-First Progressive Web App for field technicians to manage jobs with and without internet connection.

**Live Demo:** https://field-operations-pwa.netlify.app/

---

## How to Run This Project Locally

### Step 1: Open Terminal in Project Folder

Right-click inside project folder → Select "Open in Terminal" (or use VS Code terminal)

### Step 2: Install Dependencies

```bash
cd FieldOps
npm install
npm install vite
npm install dexie lucide-react react-hot-toast
npm install -D vite-plugin-pwa
```

### Step 3: Start the Project

```bash
cd FieldsOps
npm run dev
```

### Step 4: Open in Browser

Press Ctrl + Click on http://localhost:5500/

## How to Test Offline Feature

Step Action
1 Open the app normally (internet on),
2 Turn off WiFi or enable Airplane mode,
3 Add a job (fill form → Create Job),
4 Job shows "Pending Sync" (orange badge),
5 Turn WiFi back on,
6 Jobs sync automatically,
7 Or click "Sync Now" button in navbar

## Sync Messages

Situation Message,
No jobs added No jobs to sync,
All jobs already synced All jobs already synced!
,Syncing pending jobs Syncing X jobs...
,Sync completed Synced X jobs!

## Packages Installed

Package Purpose
react= UI framework,
react-dom= DOM rendering,
dexie= IndexedDB storage,
lucide-react= Icons,
react-hot-toast= Notifications,
vite= Build tool,
vite-plugin-pwa= PWA support

## Project Structure

FieldsOps Pro
src/
├── components/
│ ├── Navbar.jsx → Navigation bar
│ ├── Dashboard.jsx → Home page with stats
│ ├── JobsList.jsx → All jobs list
│ ├── AddJobForm.jsx → Create new job form
│ ├── Settings.jsx → App settings
│ └── OfflineAlert.jsx → Offline mode alert
├── db/
│ └── database.js → IndexedDB setup
├── App.jsx → Main app logic
├── main.jsx → Entry point
└── index.css → Global styles

public/
├── sw.js → Service worker
└── manifest.json → PWA config
index.html
README.md
package.json
vite.config.js

### Submission Info

Task ID: FWD-6,
Task Title: High-Performance Offline-First Progressive Web App for Field Operations,
Submitted To: TEYZIX CORE,
Submitted by: Aiza Nadeem (TC-INT-20260426-082),
Date: 31th May 2026
