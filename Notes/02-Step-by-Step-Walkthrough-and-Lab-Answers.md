# Step-by-Step Lab Walkthrough & Quick Reference Guide

This file summarizes every step performed in this lab, the backups created, and all screenshot checkpoints so you can easily review what happened at each stage.

---

## Backups Created (As Instructed in Lab)

| Original File | Backup File Created | When / Why |
| :--- | :--- | :--- |
| `server/server.js` | `server/server.jsbak` | Before cleaning up `server.js` and locking CORS to `http://localhost:5173` |
| `src/App.jsx` (Week 1 localStorage) | `src/Appjsx.bak` | Before replacing `localStorage` with `getEquipment()` API fetch (Phase 1) |
| `src/App.jsx` (Phase 1 Read-Only API) | `src/appjsxv2.bak` | Before adding `POST`, `PUT`, `DELETE`, `success` state, and removing adapter (Phase 2) |
| `src/components/EquipmentForm.jsx` | `src/components/EquipmentForm.jsx.bak` | Before converting form to async submission with `notes`, `saving`, and `error` state |
| `src/components/EquipmentCard.jsx` | `src/components/equipmentcardjsx.bak` | Before converting card to read MongoDB fields (`_id`, `available`, `notes`) directly |

---

## Phase 1 Summary: Connecting React `GET` to Express & MongoDB

1. **Cleaned up `server/server.js`**:
   - Configured CORS specifically for `http://localhost:5173`.
   - Kept single `app.listen(PORT)` inside `startServer()` after `await connectDB()`.
2. **Created Root `.env`**:
   - Added `VITE_API_URL=http://localhost:3001/api`.
3. **Created `src/services/equipmentApi.js`**:
   - Defined `apiRequest()` helper plus `getEquipment`, `createEquipment`, `updateEquipment`, and `deleteEquipment`.
4. **Updated `src/App.jsx` (Phase 1 Transitional Version)**:
   - Replaced `localStorage` with `useEffect(() => { loadEquipment(); }, [])`.
   - Used a temporary field adapter (`id: item._id`, `status: displayStatus(item)`, `description: item.notes || ""`) so the original `EquipmentCard.jsx` worked before modifying child components.

---

## Phase 2 Summary: Full CRUD (`POST`, `PUT`, `DELETE`) & Native MongoDB Fields

1. **Updated `src/components/EquipmentForm.jsx`**:
   - Removed manual `status` dropdown (availability is controlled by the backend).
   - Replaced `description` with `notes`.
   - Added `"Needs Repair"` to the `Condition` dropdown to match Mongoose's enum.
   - Added `saving` and `error` states and made `submit()` an `async` function that awaits `onSave(...)`.
2. **Updated `src/components/EquipmentCard.jsx`**:
   - Reads `item.available`, `item.notes`, and `item._id` directly from the MongoDB document.
   - Removed the old local `"Cycle status"` button.
3. **Updated `src/App.jsx` (Phase 2 Full CRUD Version)**:
   - Imported `getEquipment`, `createEquipment`, `updateEquipment`, and `deleteEquipment`.
   - Added `const [success, setSuccess] = useState("");` and rendered the status notice when operations succeed.
   - Implemented `async function save(item)` (`PUT` when `editing` is set, `POST` when creating new) followed by `await loadEquipment()`.
   - Implemented `async function remove(id)` (`window.confirm` + `DELETE /api/equipment/:id`) followed by `await loadEquipment()`.
   - Simplified `statuses` to `["Available", "Unavailable"]` and updated the stat card label from `"Currently rented"` to `"Unavailable"`.

---

## Slide Questions Cheat Sheet

| Question | Answer |
| :--- | :--- |
| **If two employees open GearVault on different computers (with `localStorage`), will they see the same equipment?** | **No.** Each browser maintains its own local storage. |
| **Why can't we write `const equipment = fetch(...)` and immediately treat `equipment` as an array?** | Because `fetch()` is asynchronous and returns a **Promise**, not the completed equipment array. |
| **What HTTP method is used to load equipment?** | `GET` |
| **Which server responds?** | Express on port `3001` |
| **What format is returned?** | `JSON` |
| **What identifies each record?** | MongoDB `_id` |
| **What triggers the request on page load?** | React `useEffect()` |
| **Where is the data stored?** | MongoDB (`gearvault` database, `equipment` collection) |
| **Why are there two requests in the Network tab when creating/updating equipment?** | The 1st request (`POST` or `PUT`) saves the document in MongoDB via `createEquipment()`/`updateEquipment()`. The 2nd request (`GET`) is triggered by `await loadEquipment()` to refresh React's state with the latest list from MongoDB. |
| **Where did `_id` come from? Why didn't we enter it in the React form?** | Mongoose/MongoDB automatically generates a unique `ObjectId` (`_id`) when a new document is created. |
