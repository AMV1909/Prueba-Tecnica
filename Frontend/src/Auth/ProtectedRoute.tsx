import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../Hooks/store";
import { PathRoutes } from "../Types/types.d";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const location = useLocation().pathname as PathRoutes;
    const user = useAppSelector((state) => state.user);

    console.log(user);

    switch (location) {
        case PathRoutes.Home:
            if (user._id === "") return <Navigate to={PathRoutes.Login} />;
            break;

        case PathRoutes.Login:
            if (user._id !== "") return <Navigate to={PathRoutes.Home} />;
            break;

        case PathRoutes.Admin:
            if (user.role !== "Admin") return <Navigate to={PathRoutes.Home} />;
            break;

        case PathRoutes.Patients:
            if (user.role === "Default")
                return <Navigate to={PathRoutes.Home} />;
            break;

        case PathRoutes.Records:
            if (user.role === "Default")
                return <Navigate to={PathRoutes.Home} />;
            break;

        case PathRoutes.Labs:
            if (user.role === "Default")
                return <Navigate to={PathRoutes.Home} />;
            break;

        default:
            return children;
    }

    return children;
}
