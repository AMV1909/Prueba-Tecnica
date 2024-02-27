import { Link, useLocation, useNavigate } from "react-router-dom";

import { PathRoutes } from "../../Types/types.d";
import { useUserActions } from "../../Hooks/useUserActions";
import { useAppSelector } from "../../Hooks/store";
import logo from "../../Assets/logo.webp";

import "./Navbar.css";

const unloggedRoutes = [PathRoutes.Login];

export function Navbar() {
    const location = useLocation().pathname as PathRoutes;
    const user = useAppSelector((state) => state.user);
    const { logout } = useUserActions();
    const navigate = useNavigate();

    if (unloggedRoutes.includes(location)) return null;

    const logoutUser = () => {
        console.log("Logout");
        logout();
        navigate(PathRoutes.Login);
    };

    return (
        <nav>
            <Link to={PathRoutes.Home}>
                <img src={logo} alt="Logo" />
            </Link>

            <Link to={PathRoutes.Patients}>Pacientes</Link>
            <Link to={PathRoutes.Records}>Registros Clínicos</Link>
            <Link to={PathRoutes.Labs}>Resultados de Laboratorio</Link>

            {user.role === "Admin" && (
                <Link to={PathRoutes.Admin}>Administrar Médicos</Link>
            )}

            <Link to="#" onClick={logoutUser}>
                Logout
            </Link>
        </nav>
    );
}
