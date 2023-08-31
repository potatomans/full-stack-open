import { NewPatient, Gender } from "./types"

const isString = (text: unknown): text is string => {
    return typeof text === 'string'
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(n => n.toString()).includes(gender)
}

const parseText = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('missing or incorrect name')
    }
    return text
}

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('missing or incorrect date of birth')
    }
    return date
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('missing or incorrect gender')
    }
    return gender
} 

const toNewPatient = (obj: unknown): NewPatient => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('incorrect or missing data')
    }

    if ('name' in obj && 'dateOfBirth' in obj && 'ssn' in obj && 'gender' in obj && 'occupation' in obj) {
        const newPatient: NewPatient = {
            name: parseText(obj.name),
            dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
            ssn: parseText(obj.ssn),
            gender: parseGender(obj.gender),
            occupation: parseText(obj.occupation),
            entries: []
        }
        return newPatient
    }
    throw new Error('missing fields in data')
}

export default toNewPatient