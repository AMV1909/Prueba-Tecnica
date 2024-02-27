import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
    return await axios
        .get(`${VITE_API_URL}/admin/users`, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};

export const getUser = async (_id: string) => {
    return await axios
        .get(`${VITE_API_URL}/admin/users/${_id}`, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};

export const createUser = async (user: {
    _id: string;
    name: string;
    role: string;
    email: string;
    password: string;
}) => {
    return await axios
        .post(`${VITE_API_URL}/admin/users`, user, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};

export const updateUser = async (user: {
    _id: string;
    name: string;
    role: string;
    email: string;
    password: string;
}) => {
    return await axios
        .put(`${VITE_API_URL}/admin/users`, user, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};

export const deleteUser = async (_id: string) => {
    return await axios
        .delete(`${VITE_API_URL}/admin/users/${_id}`, {
            headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => res.data);
};
