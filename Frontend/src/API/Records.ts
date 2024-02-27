import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getRecords = async () => {
    return await axios
        .get(`${VITE_API_URL}/records`, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};

export const getRecordsById = async (id: number | string) => {
    return await axios
        .get(`${VITE_API_URL}/records/${id}`, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};

export const createRecord = async (data: {
    patientId: number;
    reason: string;
    symptoms: string;
    diagnosis: string;
    treatment: string;
    observations: string;
    requestLab: boolean;
    laboratoryExam: string;
    notes?: string;
}) => {
    return await axios
        .post(`${VITE_API_URL}/records`, data, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};
