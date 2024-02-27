import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useAppSelector } from "../Hooks/store";
import { getRecords, getRecordsById } from "../API/Records";
import { Record } from "../Types/types";
import { RecordModal } from "../Components";

export function Records() {
    const [records, setRecords] = useState<Record[]>([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    const user = useAppSelector((state) => state.user);

    const fetchRecords = async () => {
        await getRecords()
            .then((res) => setRecords(res))
            .catch(() => toast.error("Error al obtener registros"));
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearch = async () => {
        if (search === "") {
            return fetchRecords();
        }

        await getRecordsById(search)
            .then((res) => setRecords(res))
            .catch(() => toast.error("Error al obtener registros"));
    };

    return (
        <main className="ips__page">
            <h1>Registros</h1>

            <div className="ips__page-search">
                <input
                    type="text"
                    name="search"
                    placeholder="Buscar registros por cédula"
                    onChange={onChange}
                />

                <button onClick={handleSearch}>Buscar</button>

                <div className="add">
                    {user.role === "Doctor" && (
                        <button onClick={() => setShowModal(true)}>+</button>
                    )}
                </div>
            </div>

            <table className="bigTable">
                <thead>
                    <tr>
                        <th>Registro</th>
                        <th>Cédula Doctor</th>
                        <th>Fecha</th>
                        <th>Motivo Consulta</th>
                        <th>Síntomas Presentados</th>
                        <th>Diagnóstico</th>
                        <th>Tratamiento</th>
                        <th>Observaciones</th>
                    </tr>
                </thead>

                <tbody>
                    {records.length === 0 ? (
                        <tr>
                            <td colSpan={9}>No hay registros</td>
                        </tr>
                    ) : (
                        records.map((record) => (
                            <tr key={record._id}>
                                <td>{record._id}</td>
                                <td>{record.doctorId}</td>
                                <td>
                                    {record.date
                                        .split("T")[0]
                                        .replaceAll("-", "/")}
                                </td>
                                <td>{record.reason}</td>
                                <td>{record.symptoms}</td>
                                <td>{record.diagnosis}</td>
                                <td>{record.treatment}</td>
                                <td>{record.notes}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {showModal && (
                <RecordModal
                    setShowModal={setShowModal}
                    fetchRecords={fetchRecords}
                />
            )}
        </main>
    );
}
