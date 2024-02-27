import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getPdf = async (id: string) => {
    return await axios
        .get(`${VITE_API_URL}/download/${id}`, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};
