import { model, Schema } from "mongoose";

export const patient = model(
    "Patient",
    new Schema({
        _id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        birthDate: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        allergy: String,
        illness: String,
        phone: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    })
);
