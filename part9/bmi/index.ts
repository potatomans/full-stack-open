import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

//const express = require('express')
const app = express()
app.use(express.json())

app.get('/bmi', (req, res) => {
    if (!req.query.weight || !req.query.height || isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height))) {
        return res.status(400).json({ error: "malformatted parameters" })
    }
    return res.json({
        weight: Number(req.query.weight),
        height: Number(req.query.height),
        bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    })
})

app.get('/exercises', (_req, res) => {
    res.send('hello')
})

app.post('/exercises', (req, res) => {
    const target = req.body.target
    const exercisesArr = req.body['daily_exercises']

    const onlyNum = (arr: any[]): boolean => {
        return arr.every(element => {
            return !isNaN(element)
        })
    }

    if (!target || !exercisesArr) {
        return res.status(400).json({ error: "parameters missing" })
    }

    else if (isNaN(Number(target)) || !onlyNum(exercisesArr)) {
        return res.status(400).json({ error: "malformatted paramters" })
    }
    return res.json(calculateExercises(target, exercisesArr))
})

const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
