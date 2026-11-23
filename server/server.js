import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/db.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "GearVault API is running"
  });
});

// Existing equipment routes
app.use("/api/equipment", equipmentRoutes);

// Start only after MongoDB connects
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `GearVault API running on port ${PORT}`
    );
  });
}

startServer();
