import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { getPatient, getPatients } from "../API/Patients";
import { useAppSelector } from "../Hooks/store";
import { PatientModal } from "../Components";
import { LaboratoryResult, Patient, Record, User } from "../Types/types";
import { getPdf } from "../API/Download";

export function Patients() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [patientSelected, setPatientSelected] = useState<Patient | undefined>(
        undefined
    );

    const user = useAppSelector((state) => state.user);

    const fetchPatients = async () => {
        getPatients()
            .then((res) => setPatients(res))
            .catch(() => toast.error("Error al obtener pacientes"));
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const addPatient = () => {
        setShowModal(true);
    };

    const updatePatient = (patient: Patient) => {
        setPatientSelected(patient);
        setShowModal(true);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const getPatientsBySearch = async () => {
        toast.loading("Buscando paciente", { id: "loading" });

        if (search === "") {
            toast.dismiss("loading");
            return fetchPatients();
        }

        await getPatient(Number(search))
            .then((data) => {
                if (!data) return setPatients([]);

                setPatients([data]);
            })
            .catch(() => toast.error("Error al obtener paciente"))
            .finally(() => toast.dismiss("loading"));
    };

    const download = async (user: User) => {
        toast.loading("Descargando PDF", { id: "loading" });

        await getPdf(user._id)
            .then(
                (data: {
                    patient: Patient;
                    records: Record[];
                    laboratoryExams: LaboratoryResult[];
                }) => {
                    const doc = new jsPDF();

                    autoTable(doc, {
                        head: [
                            [
                                "Cédula",
                                "Nombre",
                                "Fecha de Nacimiento",
                                "Género",
                                "Alergias",
                                "Enfermedades",
                                "Teléfono",
                                "Dirección",
                            ],
                        ],
                        body: [
                            [
                                data.patient._id,
                                data.patient.name,
                                data.patient.birthDate
                                    .split("T")[0]
                                    .replaceAll("-", "/"),
                                data.patient.gender,
                                data.patient.allergy,
                                data.patient.illness,
                                data.patient.phone,
                                data.patient.address,
                            ],
                        ],
                    });

                    if (data.records) {
                        doc.addPage();

                        autoTable(doc, {
                            head: [
                                [
                                    "Cédula",
                                    "Fecha",
                                    "Motivo Consulta",
                                    "Síntomas",
                                    "Diagnóstico",
                                    "Tratamiento",
                                    "Observaciones",
                                ],
                            ],
                            body: data.records.map((record) => [
                                record.patientId,
                                record.date.split("T")[0].replaceAll("-", "/"),
                                record.reason,
                                record.symptoms,
                                record.diagnosis,
                                record.treatment,
                                record.notes,
                            ]),
                        });
                    }

                    if (data.laboratoryExams) {
                        doc.addPage();

                        autoTable(doc, {
                            head: [
                                ["Cédula", "Fecha", "Tipo de Exámen", "Estado"],
                            ],
                            body: data.laboratoryExams.map((lab) => [
                                lab.recordId,
                                lab.requestDate
                                    .split("T")[0]
                                    .replaceAll("-", "/"),
                                lab.testType,
                                lab.status,
                            ]),
                        });
                    }

                    doc.save("reporte.pdf");

                    console.log(data);
                }
            )
            .catch((err) => console.log(err))
            .finally(() => toast.dismiss("loading"));
    };

    return (
        <main className="ips__page">
            <h1>Pacientes</h1>

            <div className="ips__page-search">
                <input
                    type="number"
                    name="search"
                    onChange={onChange}
                    placeholder="Buscar usuario"
                />

                <button onClick={getPatientsBySearch}>Buscar</button>
            </div>

            <table className="bigTable">
                <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre y Apellidos</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Género</th>
                        <th>Alergias</th>
                        <th>Enfermedades</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>
                            <div className="add">
                                Acciones{" "}
                                {user.role === "Doctor" && (
                                    <button onClick={addPatient}>+</button>
                                )}
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {patients.length === 0 ? (
                        <tr>
                            <td colSpan={9}>No hay pacientes</td>
                        </tr>
                    ) : (
                        patients.map((patient) => (
                            <tr key={patient._id}>
                                <td>{patient._id}</td>
                                <td>{patient.name}</td>
                                <td>
                                    {patient.birthDate
                                        .split("T")[0]
                                        .replaceAll("-", "/")}
                                </td>
                                <td>{patient.gender}</td>
                                <td>{patient.allergy}</td>
                                <td>{patient.illness}</td>
                                <td>{patient.phone}</td>
                                <td>{patient.address}</td>
                                <td className="actions">
                                    <div>
                                        {user.role === "Doctor" && (
                                            <button
                                                onClick={() =>
                                                    updatePatient(patient)
                                                }
                                            >
                                                Editar
                                            </button>
                                        )}

                                        <button onClick={() => download(user)}>
                                            PDF
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {showModal && (
                <PatientModal
                    setShowModal={setShowModal}
                    fetchPatients={fetchPatients}
                    patientSelected={patientSelected}
                />
            )}
        </main>
    );
}
