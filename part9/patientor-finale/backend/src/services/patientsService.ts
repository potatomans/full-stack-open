import patients from '../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from "../types";
import { v1 as uuid } from 'uuid'

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({ id, name, dateOfBirth, gender, occupation, entries }))}

const getSensitivePatients = () : Patient[] => {
    return patients
}

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    }
    patients.push(newPatient)
    return newPatient
}

export default { getNonSensitivePatients, getSensitivePatients, addPatient }

