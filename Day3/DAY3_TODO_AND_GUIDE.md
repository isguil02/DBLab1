# GearVault — Pre-Day 3 Status, Day 3 To-Do List & Completion Guide

> Note: This file is also saved at the workspace root (`../DAY3_TODO_AND_GUIDE.md`).

---

## Part 0: Current Status & Thunder Client Instructions (Finish Day 2)

### What Has Already Been Completed for You (Day 1 & Day 2 Code)
Your Express backend in `Day1/GearVaultStarter/server/server.js` has been fully updated with all Day 1 and Day 2 code:
- Connected to `Day1/GearVaultStarter/server/data/equipment.js` (`import { equipment } from "./data/equipment.js";`).
- `GET /` — Returns `"GearVault API is running"`.
- `GET /api/equipment` — Returns the full equipment array.
- `GET /api/equipment/available` — Returns only items where `available === true` (placed before `/:id`).
- `GET /api/summary` — Returns `{ totalEquipment, availableEquipment, unavailableEquipment }`.
- `GET /api/equipment/:id` — Returns a single item by numeric ID, or `404` `{ "error": "Equipment not found" }`.
- `POST /api/equipment` — Validates `name` and `category` (`400` on invalid input), assigns the next numeric `id`, defaults `condition` to `"Good"`, sets `available: true`, pushes to the array, and returns `201 Created`.

---

### How to Interact with the Thunder Client Extension (Manual IDE Steps)
Because the AI assistant cannot click inside the Thunder Client GUI panel in your IDE, follow these steps once you switch to your IDE to verify Day 2 before starting Day 3:

1. **Install Thunder Client:**
   - Press `Ctrl+Shift+X` in VS Code / your IDE to open **Extensions**.
   - Search for **Thunder Client** and click **Install**.
   - Click the **Thunder Client** lightning bolt icon on the left sidebar and sign in with a free account if prompted.

2. **Start Your Express Backend Server:**
   - Open a terminal in your IDE and run:
     ```bash
     cd Day1/GearVaultStarter/server
     npm run dev
     ```
   - Confirm you see: `GearVault API running at http://localhost:3001`

3. **Run the Day 2 Verification Requests in Thunder Client:**
   Click **New Request** in Thunder Client and run each of these:

   - **Request 1 — Retrieve all equipment:**
     - Method: `GET`
     - URL: `http://localhost:3001/api/equipment`
     - Click **Send** -> Verify status `200 OK` (returns 3 items).

   - **Request 2 — Retrieve one item by ID:**
     - Method: `GET`
     - URL: `http://localhost:3001/api/equipment/1`
     - Click **Send** -> Verify status `200 OK` (returns Canon EOS R50).

   - **Request 3 — Retrieve an invalid ID:**
     - Method: `GET`
     - URL: `http://localhost:3001/api/equipment/999`
     - Click **Send** -> Verify status `404 Not Found` (`{ "error": "Equipment not found" }`).

   - **Request 4 — Add new equipment (`POST`):**
     - Method: `POST`
     - URL: `http://localhost:3001/api/equipment`
     - Open the **Body** tab -> select **JSON** -> paste:
       ```json
       {
         "name": "GoPro Hero",
         "category": "Camera",
         "condition": "Excellent"
       }
       ```
     - Click **Send** -> Verify status `201 Created` and that the returned object has `"id": 4`.

   - **Request 5 — Confirm the item was added:**
     - Method: `GET`
     - URL: `http://localhost:3001/api/equipment`
     - Click **Send** -> Verify status `200 OK` and that `GoPro Hero` is now in the list alongside the original 3 items.

---

## Part 1: Day 3 To-Do List (`DatabaseIntegration_ExerciseInClass.pptx`)

Use this checklist to track your progress through Day 3:

### Section A: Demonstrate In-Memory Limitation & Concept Check
- [ ] **1.** With Express running, confirm `GoPro Hero` (or a new microphone) is visible via `GET http://localhost:3001/api/equipment`.
- [ ] **2.** Stop the Express server in your terminal (`Ctrl+C`), restart it (`npm run dev`), and send `GET http://localhost:3001/api/equipment` again to observe that added items disappeared.
- [ ] **3.** Review the document analysis exercise (Slide 14–15: `Sony FX30` document & `$lt` query).
- [ ] **4.** Review the data modeling exercise for the `equipment`, `customers`, and `rentals` collections (Slides 16–18).

### Section B: Install & Verify MongoDB Environment (Slides 23–28)
- [ ] **5.** Download **MongoDB Community Server** (Windows x64 `.msi` package) from `https://www.mongodb.com/try/download/community`.
- [ ] **6.** Run the installer:
  - [ ] Choose **Complete** setup type.
  - [ ] Check **Install MongoDB as a Service** ("Run service as Network Service user").
  - [ ] Keep default settings and allow **MongoDB Compass** to install.
- [ ] **7.** Reboot Windows if prompted by the installer (save your work first).
- [ ] **8.** Verify the MongoDB Windows service is running:
  - [ ] Press `Win + R`, type `services.msc`, and press Enter.
  - [ ] Locate **MongoDB Server (MongoDB)** and verify its status is **Running** (if stopped, right-click -> **Start**).
- [ ] **9.** Connect using **MongoDB Compass**:
  - [ ] Open **MongoDB Compass** and click **Start** -> **New Connection**.
  - [ ] Confirm URI is `mongodb://localhost:27017/` (or `mongodb://127.0.0.1:27017`).
  - [ ] (Optional, matching slide screenshot) Set **Name** to `MongoDBConnection`, **Color** to `Green`, and check **Favorite this connection**.
  - [ ] Click **Save & Connect**.
  - [ ] Confirm you see the default databases (`admin`, `config`, `local`).

### Section C: Day 3 Deliverable Submission
- [ ] **10.** **Take a screenshot** of your connected **MongoDB Compass** window showing the connected server and databases (`admin`, `config`, `local`) and **submit it to the Canvas assignment** (Slide 28).

---

## Part 2: Complete Guide for Day 3

### 1. Why We Are Moving to MongoDB (Slides 3–13)
- **The Problem:** `server/data/equipment.js` only initializes an in-memory JavaScript array inside the Node.js process. Any `POST` changes exist only in RAM and are wiped out whenever the server restarts.
- **Relational vs. Document Databases:**
  | Relational (MySQL / MariaDB) | MongoDB (Document Database) |
  | :--- | :--- |
  | Database | Database (`gearvault`) |
  | Table | Collection (`equipment`, `customers`) |
  | Row | Document (BSON / JSON-like object) |
  | Column | Field (`name`, `category`, `dailyRate`, etc.) |
  | Primary Key (`id`) | `_id` (auto-generated `ObjectId`) |

---

### 2. In-Class Concept Answers (Slides 14–18)

#### Slide 14–15: Document Inspection & Query Exercise
Given document:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Sony FX30",
  "category": "Camera",
  "available": true,
  "dailyRate": 45,
  "tags": ["video", "4k"]
}
```
- **Collection:** `equipment`
- **Unique Identifier:** `_id` (`"507f1f77bcf86cd799439011"`, MongoDB `ObjectId`)
- **Fields & Data Types:**
  - `name`: `String` (Required)
  - `category`: `String` (Required)
  - `available`: `Boolean`
  - `dailyRate`: `Number`
  - `tags`: `Array` of `String`s (Optional)
- **Query to find all cameras with a daily rental rate below \$50 (MongoDB Shell syntax):**
  ```javascript
  db.equipment.find({
    category: "Camera",
    dailyRate: { $lt: 50 }
  });
  ```

---

#### Slide 16: Planned GearVault Collections & Schemas
In the `gearvault` database, we design two primary collections first:

1. **`equipment` Collection Schema Requirements:**
   | Field | Type | Requirement |
   | :--- | :--- | :--- |
   | `name` | `String` | Required |
   | `category` | `String` | Required |
   | `available` | `Boolean` | Default `true` |
   | `dailyRate` | `Number` | Required, minimum `0` |
   | `condition` | `String` | Optional, controlled choices (e.g., `Excellent`, `Good`, `Fair`, `Needs Repair`) |
   | `notes` | `String` | Optional |
   | `createdAt` | `Date` | Automatically generated |

2. **`customers` Collection Schema Requirements:**
   | Field | Type | Requirement |
   | :--- | :--- | :--- |
   | `firstName` | `String` | Required |
   | `lastName` | `String` | Required |
   | `email` | `String` | Required, unique index |
   | `phone` | `String` | Optional |
   | `active` | `Boolean` | Default `true` |
   | `createdAt` | `Date` | Automatically generated |

---

#### Slide 17–18: Designing the `rentals` Collection
- **What information should a rental contain?** Customer reference, equipment reference, rental start date, due date, and return status.
- **Should a rental store the full customer/equipment object or just the ID?** Store **only the IDs** (`customerId` and `equipmentId` as `Schema.Types.ObjectId` references) so customer/equipment updates stay consistent in one place.
- **What happens when equipment is returned?** `returned` is updated to `true` (and the equipment's `available` status can be set back to `true`).
- **Conceptual Rental Document:**
  ```json
  {
    "customerId": "customer-object-id",
    "equipmentId": "equipment-object-id",
    "rentalDate": "2026-11-06",
    "dueDate": "2026-11-10",
    "returned": false
  }
  ```

---

### 3. Step-by-Step Guide to Installing MongoDB & Compass (Slides 23–28)

#### Step 1: Download & Install MongoDB Community Server
1. Open your browser and go to:  
   `https://www.mongodb.com/try/download/community`
2. Scroll to **MongoDB Community Server**.
3. Select the latest release, Platform: **Windows x64**, Package: **msi**, and click **Download**.
4. Run the `.msi` installer:
   - Choose **Complete**.
   - On the **Service Configuration** screen:
     - Select **Install MongoDB as a Service**.
     - Select **Run service as Network Service user**.
     - Keep default data/log directories.
   - Ensure **Install MongoDB Compass** is checked.
   - Complete the installation and reboot if prompted.

#### Step 2: Verify the MongoDB Service is Running
1. Press `Win + R` on your keyboard.
2. Type `services.msc` and press **Enter**.
3. Scroll down to **MongoDB Server (MongoDB)**.
4. Check that the **Status** column says **Running**.
   - If it is not running, right-click **MongoDB Server (MongoDB)** and click **Start**.

#### Step 3: Connect with MongoDB Compass & Take Your Screenshot
1. Launch **MongoDB Compass** from the Start Menu.
2. Click **New Connection**.
3. Verify the **URI** field contains:
   ```text
   mongodb://localhost:27017/
   ```
   *(or `mongodb://127.0.0.1:27017`)*
4. (Optional) Under **Name**, enter `MongoDBConnection`, choose `Green` for **Color**, and check **Favorite this connection**.
5. Click **Save & Connect**.
6. Once connected, you will see `admin`, `config`, and `local` in the left sidebar (the `gearvault` database will appear automatically once Mongoose writes the first document in Part 2).
7. **Take a screenshot** of this connected MongoDB Compass window and submit it to your assignment!
