import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router()

router.get('/', (_req, res) => {
    console.log('fetched diagnoses')
    res.json(diagnosesService.getDiagnoses())
})

export default router