import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getPatients = async () => {
    return await axios
        .get(`${VITE_API_URL}/patients`, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};

export const getPatient = async (id: number) => {
    return await axios
        .get(`${VITE_API_URL}/patients/${id}`, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};

export const createPatient = async (data: {
    _id: number;
    name: string;
    birthDate: string;
    gender: string;
    allergy: string;
    illness: string;
    phone: number;
    address: string;
}) => {
    return await axios
        .post(`${VITE_API_URL}/patients`, data, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};

export const updatePatient = async (data: {
    _id: number;
    name: string;
    birthDate: string;
    gender: string;
    allergy: string;
    illness: string;
    phone: number;
    address: string;
}) => {
    return await axios
        .put(`${VITE_API_URL}/patients/${data._id}`, data, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};
