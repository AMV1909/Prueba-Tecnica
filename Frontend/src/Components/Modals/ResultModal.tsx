import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useState,
} from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LaboratoryResult } from "../../Types/types";
import { markCompleted } from "../../API/LaboratoryExams";

interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    examSelected: LaboratoryResult;
    result?: LaboratoryResult["result"];
}

export function ResultModal({ setShowModal, examSelected, result }: Props) {
    const [bloodTest, setBloodTest] = useState({
        hemoglobin: 0,
        glucose: 0,
        hematocrit: 0,
        cholesterol: 0,
        triglycerides: 0,
        hematies: 0,
        leucocytes: 0,
        platelets: 0,
    });

    const [urineTest, setUrineTest] = useState({
        color: "",
        aspect: "",
        density: 0,
        pH: 0,
        proteins: "",
        glucose: "",
        ketones: "",
        bilirubin: "",
        urobilinogen: 0,
        nitrites: "",
    });

    const onChangeBlood = (e: ChangeEvent<HTMLInputElement>) => {
        setBloodTest({ ...bloodTest, [e.target.name]: e.target.value });
    };

    const onChangeUrine = (e: ChangeEvent<HTMLInputElement>) => {
        setUrineTest({ ...urineTest, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (examSelected.testType === "Exámen de Sangre") {
            return await markCompleted(examSelected._id, bloodTest)
                .then(() => {
                    setShowModal(false);
                })
                .catch(() => console.error("Error al guardar resultados"));
        }

        await markCompleted(examSelected._id, urineTest)
            .then(() => {
                setShowModal(false);
            })
            .catch(() => console.error("Error al guardar resultados"));
    };

    return (
        <div className="ips__modal">
            <div className="ips__modal-container">
                <header>
                    <h2>{result ? "" : "Dar"} Resultados</h2>

                    <button onClick={() => setShowModal(false)}>
                        <IoIosCloseCircleOutline />
                    </button>
                </header>

                {result ? (
                    <div className="results">
                        {Object.keys(result).map((key) => (
                            <p key={key}>
                                <span>{key}: </span>
                                <span>{(result as never)[key]}</span>
                            </p>
                        ))}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {examSelected!.testType === "Exámen de Sangre" ? (
                            <>
                                <input
                                    type="number"
                                    placeholder="Hemoglobina en g/dL"
                                    onChange={onChangeBlood}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Glucosa en mg/dL"
                                    onChange={onChangeBlood}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Hematocrito en %"
                                    onChange={onChangeBlood}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Colesterol total en mg/dL"
                                    onChange={onChangeBlood}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Triglicéridos en mg/dL"
                                    onChange={onChangeBlood}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Hematíes en millones/mm³"
                                    onChange={onChangeBlood}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Leucocitos en miles/mm³"
                                    onChange={onChangeBlood}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Plaquetas en miles/mm³"
                                    onChange={onChangeBlood}
                                    required
                                />
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder="Color de la orina"
                                    onChange={onChangeUrine}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Aspecto de la orina"
                                    onChange={onChangeUrine}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Densidad de la orina"
                                    onChange={onChangeUrine}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Valor del pH de la orina"
                                    onChange={onChangeUrine}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Presencia de proteínas"
                                    onChange={onChangeUrine}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Presencia de glucosa"
                                    onChange={onChangeUrine}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Presencia de cetonas"
                                    onChange={onChangeUrine}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Presencia de bilirrubina"
                                    onChange={onChangeUrine}
                                    required
                                />

                                <input
                                    type="number"
                                    placeholder="Valor de urobilinógeno en mg/dL"
                                    onChange={onChangeUrine}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Presencia de nitritos"
                                    onChange={onChangeUrine}
                                    required
                                />
                            </>
                        )}

                        <div>
                            <button type="submit">Guardar</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
