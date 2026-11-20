import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        available: {
            type: Boolean,
            default: true
        },

        dailyRate: {
            type: Number,
            required: true,
            min: 0
        },

        condition: {
            type: String,
            enum: [
                "Excellent",
                "Good",
                "Fair",
                "Needs Repair"
            ],
            default: "Good"
        },

        notes: {
            type: String,
            default: ""
        },

        serialNumber: {
            type: String,
            trim: true
        },

        purchasePrice: {
            type: Number,
            min: 0
        },

        location: {
            type: String,
            default: "Storage Room"
        },

        tags: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Equipment = mongoose.model(
    "Equipment",
    equipmentSchema
);

export default Equipment;