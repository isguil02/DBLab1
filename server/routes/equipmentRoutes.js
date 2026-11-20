import express from "express";
import mongoose from "mongoose";
import Equipment from "../models/equipment.js";

const router = express.Router();

// GET all equipment items
router.get("/", async (req, res) => {
    try {
        const { category, available, maxRate, minRate } = req.query;
        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (available !== undefined) {
            if (!["true", "false"].includes(available)) {
                return res.status(400).json({
                    message: "available must be true or false"
                });
            }
            filter.available = available === "true";
        }

        if (maxRate !== undefined) {
            const max = Number(maxRate);
            if (maxRate.trim() === "" || !Number.isFinite(max) || max < 0) {
                return res.status(400).json({
                    message: "Invalid maximum daily rate"
                });
            }
            filter.dailyRate = { ...filter.dailyRate, $lte: max };
        }

        if (minRate !== undefined) {
            const min = Number(minRate);
            if (minRate.trim() === "" || !Number.isFinite(min) || min < 0) {
                return res.status(400).json({
                    message: "Invalid minimum daily rate"
                });
            }
            filter.dailyRate = { ...filter.dailyRate, $gte: min };
        }

        const equipment = await Equipment.find(filter).sort({ dailyRate: 1 });
        res.json(equipment);
    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve equipment"
        });
    }
});

// GET one equipment item by ID
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid equipment ID"
            });
        }

        const item = await Equipment.findById(
            req.params.id
        );

        if (!item) {
            return res.status(404).json({
                message: "Equipment not found"
            });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve equipment"
        });
    }
});

// POST create new equipment
router.post("/", async (req, res) => {
    try {
        const item = await Equipment.create(req.body);

        res.status(201).json(item);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: "Unable to create equipment"
        });
    }
});

// PUT update equipment by ID
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid equipment ID"
            });
        }

        const item = await Equipment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {
                new: true,
                runValidators: true
            }
        );

        if (!item) {
            return res.status(404).json({
                message: "Equipment not found"
            });
        }

        res.json(item);
    } catch (error) {
        if (
            error.name === "ValidationError" ||
            error.name === "CastError"
        ) {
            return res.status(400).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: "Unable to update equipment"
        });
    }
});

// DELETE ALL EQUIPMENT – DATA CLEAN-UP ONLY (Must be before /:id)
router.delete("/delete-all", async (req, res) => {
    try {
        const result = await Equipment.deleteMany({});

        res.json({
            message: "All equipment deleted successfully",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error("Delete all error:", error);
        res.status(500).json({
            message: "Unable to delete equipment"
        });
    }
});

// DELETE one equipment item by ID
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid equipment ID"
            });
        }

        const item = await Equipment.findByIdAndDelete(
            req.params.id
        );

        if (!item) {
            return res.status(404).json({
                message: "Equipment not found"
            });
        }

        res.json({
            message: "Equipment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Unable to delete equipment"
        });
    }
});

export default router;