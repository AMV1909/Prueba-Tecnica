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

import { createPatient, updatePatient } from "../../API/Patients";
import { Patient } from "../../Types/types";

interface Props {
    patientSelected?: Patient;
    setPatientSelected?: Dispatch<SetStateAction<Patient | undefined>>;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    fetchPatients: () => Promise<void>;
}

export function PatientModal({
    patientSelected,
    setPatientSelected,
    setShowModal,
    fetchPatients,
}: Props) {
    const [data, setData] = useState(
        patientSelected || {
            _id: 0,
            name: "",
            birthDate: "",
            gender: "",
            allergy: "",
            illness: "",
            phone: 0,
            address: "",
        }
    );

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.loading("Guardando...", { id: "loading", duration: 10000 });

        if (
            data._id === 0 ||
            data.name === "" ||
            data.birthDate === "" ||
            data.gender === "" ||
            data.allergy === "" ||
            data.illness === "" ||
            data.phone === 0 ||
            data.address === ""
        ) {
            toast.error("Faltan campos por llenar");
            toast.dismiss("loading");
            return;
        }

        if (data._id.toString().length < 7) {
            toast.error("La cédula debe tener al menos 7 dígitos");
            toast.dismiss("loading");
            return;
        }

        if (data.phone.toString().length < 7) {
            toast.error("El teléfono debe tener al menos 7 dígitos");
            toast.dismiss("loading");
            return;
        }

        if (patientSelected) {
            await updatePatient(data)
                .then(() => {
                    toast.success("Usuario actualizado");
                    setShowModal(false);
                    fetchPatients();
                })
                .catch((err: AxiosError) => {
                    if (!err.response) return toast.error(err.message);

                    if (err.response.status === 405)
                        return toast.error(
                            "La cédula ya se encuentra registrada"
                        );

                    toast.error("Error al actualizar el usuario");
                });
        } else {
            await createPatient(data)
                .then(() => {
                    toast.success("Paciente creado");
                    setShowModal(false);
                    fetchPatients();
                })
                .catch((err: AxiosError) => {
                    if (!err.response) return toast.error(err.message);

                    if (err.response.status === 405)
                        return toast.error("La cédula ya está registrada");

                    if (err.response.status === 403)
                        return toast.error(
                            "No tienes permisos para realizar esta acción"
                        );

                    toast.error("Error al crear el usuario");
                });
        }

        toast.dismiss("loading");
    };

    const close = () => {
        setShowModal(false);
        setPatientSelected?.(undefined);
    };

    return (
        <div className="ips__modal">
            <div className="ips__modal-container">
                <header>
                    <h1>{patientSelected ? "Editar" : "Crear"} Paciente</h1>
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
                        defaultValue={data._id === 0 ? "" : data._id}
                        disabled={patientSelected ? true : false}
                    />

                    <input
                        type="text"
                        name="name"
                        placeholder="Ingrese el nombre completo"
                        onChange={onChange}
                        defaultValue={data.name}
                    />

                    <input
                        type="date"
                        name="birthDate"
                        onChange={onChange}
                        defaultValue={data.birthDate}
                    />

                    <select
                        name="gender"
                        defaultValue={data.gender}
                        onChange={onChange}
                    >
                        <option defaultValue="">Seleccione un género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>

                    <input
                        type="text"
                        name="allergy"
                        placeholder="Ingrese las alergias"
                        onChange={onChange}
                        defaultValue={data.allergy}
                    />

                    <input
                        type="text"
                        name="illness"
                        placeholder="Ingrese las enfermedades"
                        onChange={onChange}
                        defaultValue={data.illness}
                    />

                    <input
                        type="number"
                        name="phone"
                        min={1000000}
                        max={9999999999}
                        placeholder="Ingrese el número de teléfono"
                        onChange={onChange}
                        defaultValue={data.phone === 0 ? "" : data.phone}
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Ingrese la dirección"
                        onChange={onChange}
                        defaultValue={data.address}
                    />

                    <div>
                        <button type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
