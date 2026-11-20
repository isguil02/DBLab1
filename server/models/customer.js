import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },

        phone: {
            type: String,
            default: ""
        },

        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model(
    "Customer",
    customerSchema
);

export default Customer;