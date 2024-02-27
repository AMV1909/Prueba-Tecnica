import { Schema, model } from "mongoose";

export const user = model(
    "User",
    new Schema({
        _id: {
            type: String,
            required: true,
            default: 0,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["Doctor", "Admin", "Especialista"],
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    })
);
