import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useState,
} from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";

import { createRecord } from "../../API/Records";

interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    fetchRecords: () => Promise<void>;
}

export function RecordModal({ setShowModal, fetchRecords }: Props) {
    const [data, setData] = useState({
        patientId: 0,
        reason: "",
        symptoms: "",
        diagnosis: "",
        treatment: "",
        observations: "",
        requestLab: false,
        laboratoryExam: "",
    });

    const onChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        if (e.target.name === "requestLab") {
            return setData({ ...data, [e.target.name]: !data.requestLab });
        }

        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubtmi = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await createRecord(data)
            .then(() => {
                fetchRecords();
                setShowModal(false);
            })
            .catch(() => toast.error("Error al crear el registro"));
    };

    return (
        <div className="ips__modal">
            <div className="ips__modal-container bigModal">
                <header>
                    <h1>Crear Registro Clínico</h1>

                    <button onClick={() => setShowModal(false)}>
                        <IoIosCloseCircleOutline />
                    </button>
                </header>

                <form onSubmit={handleSubtmi}>
                    <input
                        type="number"
                        name="patientId"
                        placeholder="Ingrese la cédula del paciente"
                        onChange={onChange}
                        required
                    />

                    <textarea
                        name="reason"
                        placeholder="Ingrese el motivo de la consulta"
                        onChange={onChange}
                        required
                    />

                    <textarea
                        name="symptoms"
                        placeholder="Ingrese los síntomas presentados"
                        onChange={onChange}
                        required
                    />

                    <textarea
                        name="diagnosis"
                        placeholder="Ingrese el diagnóstico dado"
                        onChange={onChange}
                        required
                    />

                    <textarea
                        name="treatment"
                        placeholder="Ingrese el tratamiento dado"
                        onChange={onChange}
                        required
                    />

                    <textarea
                        name="notes"
                        placeholder="Ingrese las observaciones"
                        onChange={onChange}
                    />

                    <label>
                        Solicitar exámen de laboratorio
                        <input
                            type="checkbox"
                            name="requestLab"
                            onChange={onChange}
                        />
                    </label>

                    {data.requestLab && (
                        <select name="laboratoryExam" onChange={onChange}>
                            <option value="">
                                Seleccione el tipo de exámen
                            </option>

                            <option value="Exámen de Orina">
                                Examen de orina
                            </option>

                            <option value="Exámen de Sangre">
                                Examen de sangre
                            </option>
                        </select>
                    )}

                    <div>
                        <button type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
