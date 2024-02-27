import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import toast from "react-hot-toast";

import { useUserActions } from "../../Hooks/useUserActions";
import { restoreSession } from "../../API/session";
import { PathRoutes, User } from "../../Types/types.d";

import "./PageLoader.css";

export function PageLoader({
    setLoading,
}: {
    setLoading: Dispatch<SetStateAction<boolean>>;
}) {
    const { setUser, logout } = useUserActions();

    useEffect(() => {
        if (!localStorage.getItem("token")) return setLoading(false);

        restoreSession()
            .then((user: User) => {
                console.log(user);

                setUser(user);
                setLoading(false);
            })
            .catch((err: AxiosError) => {
                setLoading(false);

                if (err.response && err.response.status === 500) {
                    logout();
                    window.location.href = PathRoutes.Login;

                    return toast.error("The session has expired");
                }
            });
    }, [setLoading, setUser]);

    return (
        <main className="ips__pageLoader">
            <h1>Cargando...</h1>
            <div></div>
        </main>
    );
}
