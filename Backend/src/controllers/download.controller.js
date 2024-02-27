import { patient } from "../models/patient.js";
import { record } from "../models/record.js";
import { laboratoryResult } from "../models/laboratoryResult.js";

export const download = async (req, res) => {
    const patientDB = await patient.findById(req.params.id);
    const recordsDB = await record.find({ patientId: req.params.id });
    const laboratoryResultsDB = await laboratoryResult.find({
        patientId: req.params.id,
    });

    res.status(200).json({
        patient: patientDB,
        records: recordsDB,
        laboratoryResults: laboratoryResultsDB,
    });
};
