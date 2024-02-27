import { AxiosError } from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { login } from "../../API/session";
import { useUserActions } from "../../Hooks/useUserActions";
import { User } from "../../Types/types";

import "./Login.css";

export function Login() {
    const navigate = useNavigate();
    const { setUser } = useUserActions();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.loading("Iniciando sesión...", {
            id: "loading",
            duration: 10000,
        });

        await login(data.email, data.password)
            .then((res: { token: string; data: User }) => {
                setUser(res.data);
                localStorage.setItem("token", res.token);
                toast.success("Bienvenido");
                navigate("/");
            })
            .catch((err: AxiosError) => {
                if (!err.response) return toast.error(err.message);

                toast.error("Credenciales incorrectas");
            })
            .finally(() => toast.dismiss("loading"));
    };

    return (
        <main className="ips__login">
            <div className="ips__login-container">
                <h1>Login</h1>

                <hr />

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={onChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={onChange}
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </main>
    );
}
