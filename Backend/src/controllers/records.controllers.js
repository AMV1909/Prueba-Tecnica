import { record } from "../models/record.js";
import { laboratoryResult } from "../models/laboratoryResult.js";

export const getRecords = async (req, res) => {
    await record
        .find()
        .limit(10)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
};

export const getRecord = async (req, res) => {
    await record
        .find({
            patientId: req.params.id,
        })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
};

export const createRecord = async (req, res) => {
    const {
        patientId,
        reason,
        symptoms,
        diagnosis,
        treatment,
        requestLab,
        laboratoryExam,
        notes,
    } = req.body;

    try {
        const records = await record.find({ patientId: patientId });

        const newRecord = await record.create({
            _id: patientId + "-" + Number(records.length + 1),
            patientId,
            doctorId: req.decoded._id,
            reason,
            symptoms,
            diagnosis,
            treatment,
            laboratoryExam,
            notes,
        });

        if (requestLab) {
            await laboratoryResult.create({
                patientId,
                recordId: newRecord._id,
                testType: laboratoryExam,
            });

            return res.status(202).json({
                message: "Record created and laboratory exam requested",
            });
        }

        return res.status(201).json({ message: "Record created" });
    } catch (error) {
        return res.status(400).json(error);
    }
};
