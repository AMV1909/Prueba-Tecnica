import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { LaboratoryResult } from "../Types/types.d";
import { getResults, markInProgress } from "../API/LaboratoryExams";
import { useAppSelector } from "../Hooks/store";
import { ResultModal } from "../Components/Modals/ResultModal";

export function LaboratoryExams() {
    const [laboratyExams, setLaboratyExams] = useState<LaboratoryResult[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState({} as LaboratoryResult["result"]);
    const [examSelected, setExamSelected] = useState<LaboratoryResult>({
        _id: "",
        recordId: "",
        requestDate: "",
        testType: "Default",
        status: "Default",
        resultDate: "",
        result: {},
    });

    const user = useAppSelector((state) => state.user);

    const fetchLaboratoryExams = async () => {
        await getResults()
            .then((res) => setLaboratyExams(res))
            .catch(() =>
                toast.error("Error al obtener exámenes de laboratorio")
            );
    };

    useEffect(() => {
        fetchLaboratoryExams();
    }, []);

    const markExamInProgress = async (id: string) => {
        await markInProgress(id)
            .then(() => {
                toast.success("Examen marcado como en proceso");
                fetchLaboratoryExams();
            })
            .catch(() => toast.error("Error al marcar examen como en proceso"));
    };

    const handleShowModal = (exam: LaboratoryResult) => {
        setExamSelected(exam);
        setShowModal(true);
    };

    const showResult = (exam: LaboratoryResult) => {
        setExamSelected(exam);
        setResult(exam.result);
        setShowModal(true);
    };

    return (
        <main className="ips__page">
            <h1>Exámenes de laboratorio</h1>

            <div className="ips__page-search">
                <input
                    type="text"
                    name="search"
                    placeholder="Buscar examen por cédula"
                />
                <button>Buscar</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Registro Clínico</th>
                        <th>Fecha de Solicitud</th>
                        <th>Tipo de Exámen</th>
                        <th>Estado</th>
                        <th>Fecha de Resultado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {laboratyExams.length === 0 ? (
                        <tr>
                            <td colSpan={7}>No hay exámenes de laboratorio</td>
                        </tr>
                    ) : (
                        laboratyExams.map((exam) => (
                            <tr key={exam._id}>
                                <td>{exam.recordId}</td>
                                <td>
                                    {exam.requestDate
                                        .split("T")[0]
                                        .replaceAll("-", "/")}
                                </td>
                                <td>{exam.testType}</td>
                                <td>{exam.status}</td>
                                <td>
                                    {exam.resultDate &&
                                        exam.resultDate
                                            .split("T")[0]
                                            .replaceAll("-", "/")}
                                </td>
                                <td className="actions">
                                    <div>
                                        {user.role === "Especialista" &&
                                            exam.status === "Pendiente" && (
                                                <button
                                                    onClick={() =>
                                                        markExamInProgress(
                                                            exam._id
                                                        )
                                                    }
                                                >
                                                    Marcar En Proceso
                                                </button>
                                            )}

                                        {user.role === "Especialista" &&
                                            exam.status === "En Proceso" && (
                                                <button
                                                    onClick={() =>
                                                        handleShowModal(exam)
                                                    }
                                                >
                                                    Dar Resultado
                                                </button>
                                            )}

                                        {exam.status === "Finalizado" && (
                                            <button
                                                onClick={() => showResult(exam)}
                                            >
                                                Ver Resultado
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {showModal && (
                <ResultModal
                    setShowModal={setShowModal}
                    examSelected={examSelected}
                    result={result}
                />
            )}
        </main>
    );
}
