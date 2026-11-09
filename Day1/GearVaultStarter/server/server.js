import express from "express";
import { equipment } from "./data/equipment.js";

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("GearVault API is running");
});

// GET all equipment
app.get("/api/equipment", (req, res) => {
  res.json(equipment);
});

// Exercise 1: GET available equipment
// Important: This must appear before the :id route
app.get("/api/equipment/available", (req, res) => {
  const availableEquipment = equipment.filter(
    item => item.available === true
  );

  res.json(availableEquipment);
});

// Exercise 2: GET equipment summary
app.get("/api/summary", (req, res) => {
  const total = equipment.length;

  const available = equipment.filter(
    item => item.available === true
  ).length;

  const unavailable = total - available;

  res.json({
    totalEquipment: total,
    availableEquipment: available,
    unavailableEquipment: unavailable
  });
});

// Exercise 3: GET equipment by ID
app.get("/api/equipment/:id", (req, res) => {
  const equipmentId = Number(req.params.id);

  const item = equipment.find(
    item => item.id === equipmentId
  );

  if (!item) {
    return res.status(404).json({
      error: "Equipment not found"
    });
  }

  res.json(item);
});

// Day 2: POST new equipment
app.post("/api/equipment", (req, res) => {
  const { name, category, condition } = req.body;

  // Validate required fields
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof category !== "string" ||
    !category.trim()
  ) {
    return res.status(400).json({
      error: "Equipment name and category are required"
    });
  }

  // Generate a unique ID for this in-memory dataset
  const newId = equipment.length > 0
    ? Math.max(...equipment.map(item => item.id)) + 1
    : 1;

  const newEquipment = {
    id: newId,
    name: name.trim(),
    category: category.trim(),
    condition: typeof condition === "string" &&
      condition.trim()
        ? condition.trim()
        : "Good",
    available: true
  };

  equipment.push(newEquipment);

  res.status(201).json(newEquipment);
});

// Start the server
app.listen(PORT, () => {
  console.log(`GearVault API running at http://localhost:${PORT}`);
});
