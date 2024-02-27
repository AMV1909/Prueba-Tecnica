import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getResults = async () => {
    return await axios
        .get(`${VITE_API_URL}/laboratory-exams`, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};

export const markInProgress = async (id: string) => {
    return await axios
        .put(
            `${VITE_API_URL}/laboratory-exams/in-progress/${id}`,
            {},
            {
                headers: { "x-access-token": localStorage.getItem("token") },
            }
        )
        .then((res) => res.data);
};

export const markCompleted = async (id: string, result: unknown) => {
    return await axios
        .put(
            `${VITE_API_URL}/laboratory-exams/finished/${id}`,
            { result },
            {
                headers: { "x-access-token": localStorage.getItem("token") },
            }
        )
        .then((res) => res.data);
};
