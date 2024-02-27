export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: "Admin" | "Doctor" | "Especialista" | "Default";
    createdAt: string;
    updatedAt: string;
};

export enum PathRoutes {
    Home = "/",
    Login = "/login",
    Patients = "/patients",
    Records = "/records",
    Labs = "/labs",
    Admin = "/admin",
}

export type Patient = {
    _id: string;
    name: string;
    birthDate: string;
    gender: "Masculino" | "Femenino";
    allergy: string;
    illness: string;
    phone: number;
    address: string;
    createdAt: string;
    updatedAt: string;
};

export type Record = {
    _id: string;
    patientId: string;
    doctorId: string;
    date: string;
    reason: string;
    symptoms: string;
    diagnosis: string;
    treatment: string;
    laboratoryExams: boolean;
    notes: string;
};

export type LaboratoryResult = {
    _id: string;
    recordId: string;
    requestDate: string;
    testType: "Exámen de Sangre" | "Exámen de Orina" | "Default";
    status: "Pendiente" | "En Proceso" | "Finalizado" | "Default";
    resultDate: string;
    result: object;
};
