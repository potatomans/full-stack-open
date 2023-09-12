const router = require('express').Router()

const { List } = require('../models')

const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try{
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        }
        catch {
            res.status(401).json({ error: 'invalid token' })
        }
    }
    else {
        res.status(401).json({ error: 'token missing' })
    }
    next()
}

router.post('/', async (req, res) => {
    const list = await List.create(req.body)
    res.json(list)
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const list = await List.findByPk(req.params.id)

    if (list) {
        if (req.decodedToken.id === list.userId) {
            list.read = req.body.read
            list.save()
            res.json(list)
        }
        else {
            res.json({ error: 'cannot delete note as user did not create it' })
        }
    }
    else {
        res.status(404).end()
    }
})

module.exports = router