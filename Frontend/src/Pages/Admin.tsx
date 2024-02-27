import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { deleteUser, getUser, getUsers } from "../API/Admin";
import { useAppSelector } from "../Hooks/store";
import { UserModal } from "../Components";
import { User } from "../Types/types";

export function Admin() {
    const [users, setUsers] = useState<User[]>([]);
    const userSession = useAppSelector((state) => state.user);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userSelected, setUserSelected] = useState<User | undefined>(
        undefined
    );

    const fetchUsers = async () => {
        await getUsers()
            .then((data) => setUsers(data))
            .catch(() => toast.error("Error al obtener usuarios"));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const addUser = () => {
        setShowModal(true);
    };

    const updateUser = (user: User) => {
        setUserSelected(user);
        setShowModal(true);
    };

    const deleteUserSelected = async (_id: string) => {
        if (window.confirm("¿Está seguro de desactivar este usuario?")) {
            await deleteUser(_id)
                .then(() => {
                    toast.success("Usuario eliminado");
                    fetchUsers();
                })
                .catch(() => toast.error("Error al eliminar usuario"));
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const getUserBySearch = async () => {
        toast.loading("Buscando usuario", { id: "loading" });

        if (search === "") {
            toast.dismiss("loading");
            return fetchUsers();
        }

        await getUser(search)
            .then((data) => {
                if (!data) return setUsers([]);

                setUsers([data]);
            })
            .catch(() => toast.error("Usuario no encontrado"))
            .finally(() => toast.dismiss("loading"));
    };

    return (
        <main className="ips__page">
            <h1>Administración de Usuarios</h1>

            <div className="ips__page-search">
                <input
                    type="number"
                    name="search"
                    onChange={onChange}
                    placeholder="Buscar usuario"
                />

                <button onClick={getUserBySearch}>Buscar</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre y Apellidos</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>
                            <div className="add">
                                Acciones <button onClick={addUser}>+</button>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={5}>No hay usuarios</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className="actions">
                                    {user._id !== userSession._id && (
                                        <div>
                                            <button
                                                onClick={() => updateUser(user)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteUserSelected(user._id)
                                                }
                                            >
                                                Desactivar
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {showModal && (
                <UserModal
                    userSelected={userSelected}
                    setUserSelected={setUserSelected}
                    setShowModal={setShowModal}
                    fetchUsers={fetchUsers}
                />
            )}
        </main>
    );
}
