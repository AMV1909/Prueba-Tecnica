import { laboratoryResult } from "../models/laboratoryResult.js";

export const getResults = async (req, res) => {
    await laboratoryResult
        .find()
        .limit(10)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
};

export const getResult = async (req, res) => {
    await laboratoryResult
        .find({ patientId: req.params.id })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
};

export const markAsTaken = async (req, res) => {
    const { id } = req.params;

    await laboratoryResult
        .findByIdAndUpdate(id, { status: "En Proceso" })
        .then(() =>
            res.status(200).json({ message: "Laboratory exam marked as taken" })
        )
        .catch((err) => res.status(400).json(err));
};

export const markAsFinished = async (req, res) => {
    const { id } = req.params;

    await laboratoryResult
        .findByIdAndUpdate(id, {
            status: "Finalizado",
            resultDate: Date.now(),
            result: req.body.result,
        })
        .then(() =>
            res
                .status(200)
                .json({ message: "Laboratory exam marked as finished" })
        )
        .catch((err) => res.status(400).json(err));
};
