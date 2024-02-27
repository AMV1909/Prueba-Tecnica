import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string) => {
    return await axios
        .post(`${VITE_API_URL}/login`, { email, password })
        .then((res) => res.data);
};

export const restoreSession = async () => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No token found");

    return await axios
        .get(`${VITE_API_URL}/restore-session`, {
            headers: { "x-access-token": token },
        })
        .then((res) => res.data);
};
