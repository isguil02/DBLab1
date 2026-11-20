# GearVault — Version 1 Starter

## What is included
- Fully working React + Vite equipment dashboard
- Components and props (`EquipmentCard`, `EquipmentForm`)
- useState, useEffect, useMemo
- Search, category/status filters, controlled forms
- Create, read, update, delete equipment in React state
- Immutable array operations, local JSON seed data
- Browser localStorage persistence and reset button
- Separate **minimal** Express starter for in-class API exercises

**Important:** The React frontend does NOT call Express yet. That integration is intentionally reserved for exercises. The frontend uses browser localStorage; the backend uses its own temporary in-memory array.

## Prerequisites
Install Node.js (current supported LTS release) and VS Code.

## Run React frontend
```bash
npm install
npm run dev
```
Open the local URL shown by Vite (usually http://localhost:5173).

## Run Express backend (second terminal)
```bash
cd server
npm install
npm run dev
```
Visit http://localhost:3001. Add API routes during class.

## Progression
Explore React starter, discuss server responsibilities, run `node hello.js`.
Build GET routes using `server/data/equipment.js`.
Query filtering, POST and validation, test with Postman or Thunder Client.
Next Connect React to Express with fetch and CORS; migrate CRUD operations.

## Notes
- No MongoDB, authentication or Docker required yet.
- Never put secrets in frontend code.
- LocalStorage is for frontend practice, not a secure multiuser database.
- Delete/reset in the browser only changes browser data.
