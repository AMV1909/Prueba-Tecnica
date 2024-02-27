import { AxiosError } from "axios";
import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useState,
} from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";

import { createUser, updateUser } from "../../API/Admin";
import { User } from "../../Types/types";

import "./ModalStyles.css";

interface Props {
    userSelected?: User;
    setUserSelected?: Dispatch<SetStateAction<User | undefined>>;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    fetchUsers: () => Promise<void>;
}

export function UserModal({
    userSelected,
    setUserSelected,
    setShowModal,
    fetchUsers,
}: Props) {
    const [data, setData] = useState(
        userSelected || {
            _id: "",
            name: "",
            role: "",
            email: "",
            password: "",
        }
    );

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.loading("Guardando...", { id: "loading", duration: 10000 });

        if (
            data._id === "" ||
            data.name === "" ||
            data.role === "" ||
            data.email === "" ||
            data.password === ""
        ) {
            return toast.error("Faltan campos por llenar");
        }

        if (data.password.length < 8) {
            return toast.error(
                "La contraseña debe tener al menos 8 caracteres"
            );
        }

        if (userSelected) {
            await updateUser(data)
                .then(() => {
                    toast.success("Usuario actualizado");
                    setShowModal(false);
                    fetchUsers();
                })
                .catch((err: AxiosError) => {
                    if (!err.response) return toast.error(err.message);

                    if (err.response.status === 405)
                        return toast.error("La cédula ya está en uso");

                    if (err.response.status === 406)
                        return toast.error("El correo ya está en uso");

                    toast.error("Error al actualizar el usuario");
                })
                .finally(() => toast.dismiss("loading"));
        } else {
            await createUser(data)
                .then(() => {
                    toast.success("Usuario guardado");
                    setShowModal(false);
                    fetchUsers();
                })
                .catch((err: AxiosError) => {
                    if (!err.response) return toast.error(err.message);

                    if (err.response.status === 405)
                        return toast.error("La cédula ya está en uso");

                    if (err.response.status === 406)
                        return toast.error("El correo ya está en uso");

                    toast.error("Error al guardar el usuario");
                })
                .finally(() => toast.dismiss("loading"));
        }
    };

    const close = () => {
        setShowModal(false);
        setUserSelected?.(undefined);
    };

    return (
        <div className="ips__modal">
            <div className="ips__modal-container">
                <header>
                    <h1>{userSelected ? "Editar" : "Crear"} Usuario</h1>
                    <button onClick={close}>
                        <IoIosCloseCircleOutline />
                    </button>
                </header>

                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="_id"
                        min={1000000}
                        max={9999999999}
                        placeholder="Ingrese la cédula"
                        onChange={onChange}
                        defaultValue={data._id === "" ? "" : data._id}
                        disabled={userSelected ? true : false}
                    />

                    <input
                        type="text"
                        name="name"
                        placeholder="Ingrese el nombre completo"
                        onChange={onChange}
                        defaultValue={data.name}
                    />

                    <select
                        name="role"
                        defaultValue={data.role}
                        onChange={onChange}
                    >
                        <option defaultValue="Default">
                            Seleccione el rol
                        </option>

                        <option value="Doctor">Médico General</option>
                        <option value="Especialista">Especialista</option>
                        <option value="Admin">Administrador</option>
                    </select>

                    <input
                        type="email"
                        name="email"
                        placeholder="Ingrese el correo electrónico"
                        onChange={onChange}
                        defaultValue={data.email}
                    />

                    <input
                        type="password"
                        name="password"
                        minLength={8}
                        placeholder="Ingrese la contraseña"
                        onChange={onChange}
                        defaultValue={data.password}
                    />

                    <div>
                        <button type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
