import { Schema, model } from "mongoose";

export const laboratoryResult = model(
    "LaboratoryResult",
    new Schema({
        patientId: {
            type: String,
            ref: "Patient",
            required: true,
        },
        recordId: {
            type: String,
            ref: "Record",
            required: true,
        },
        requestDate: {
            type: Date,
            default: Date.now,
        },
        testType: {
            type: String,
            enum: ["Exámen de Sangre", "Exámen de Orina"],
            required: true,
        },
        status: {
            type: String,
            enum: ["Pendiente", "En Proceso", "Finalizado"],
            required: true,
            default: "Pendiente",
        },
        resultDate: Date,
        result: Object,
    })
);
