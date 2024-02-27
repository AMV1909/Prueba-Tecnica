import { Schema, model } from "mongoose";

export const record = model(
    "Record",
    new Schema({
        _id: {
            type: String,
            required: true,
        },
        patientId: {
            type: String,
            ref: "Patient",
            required: true,
        },
        doctorId: {
            type: String,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        reason: {
            type: String,
            required: true,
        },
        symptoms: {
            type: String,
            required: true,
        },
        diagnosis: {
            type: String,
            required: true,
        },
        treatment: {
            type: String,
            required: true,
        },
        laboratoryExam: {
            type: String,
            enum: ["Exámen de Sangre", "Exámen de Orina"],
            required: false,
        },
        notes: String,
    })
);
