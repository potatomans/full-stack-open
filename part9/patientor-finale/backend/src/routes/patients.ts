import express from 'express'
import patientsService from '../services/patientsService';
import toNewPatient from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
    console.log('fetched patients')
    res.json(patientsService.getNonSensitivePatients())
})

router.get('/:id', (req, res) => {
    const patients = patientsService.getSensitivePatients()
    const match = patients.find(patient => patient.id === req.params.id)
    res.json(match)
})

router.post('/', (req, res) => {
    /*
    const { name, dateOfBirth, ssn, gender, occupation } = req.body
    const addedPatient = patientsService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    })
    res.json(addedPatient)
    */
   try {
    const newPatient = toNewPatient(req.body)

    const addedPatient = patientsService.addPatient(newPatient)
    res.json(addedPatient)
   } catch (error: unknown) {
    let errorMessage = 'Something went wrong. '
    if (error instanceof Error) {
        errorMessage += 'Error: '+ error.message
    }
    res.status(400).send(errorMessage)
   }
})

export default router