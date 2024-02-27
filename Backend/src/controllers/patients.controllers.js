import { patient } from "../models/patient.js";

export const getPatients = async (req, res) => {
    await patient
        .find()
        .limit(10)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
};

export const getPatient = async (req, res) => {
    const { id } = req.params;

    await patient
        .findById(id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
};

export const createPatient = async (req, res) => {
    const { _id, name, birthDate, gender, allergy, illness, phone, address } =
        req.body;

    await patient
        .create({
            _id,
            name,
            birthDate,
            gender,
            allergy,
            illness,
            phone,
            address,
        })
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(400).json(err));
};

export const updatePatient = async (req, res) => {
    const { id } = req.params;
    const { name, birth, gender, allergy, illness, phone, address } = req.body;

    await patient
        .findByIdAndUpdate(id, {
            name,
            birth,
            gender,
            allergy,
            illness,
            phone,
            address,
        })
        .then(() => res.status(200).json({ message: "Patient updated" }))
        .catch((err) => res.status(400).json(err));
};
