const router = require('express').Router()

const { User, Blog, List } = require('../models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: [{
            model: Blog,
            attributes: ['title']
        }
    ]
    })
    res.json(users)
})

router.get('/:id', async (req, res) => {
    console.log(req.query.read)
    let read = {
        [Op.in]: [true, false]
    }
    if (req.query.read) {
        read = req.query.read === 'true' // take note that the two "trues" here are different
    }
    if (!req.query.read) {
        read = req.query.read === 'false'
    }
    const user = await User.findByPk(req.params.id, {
        include: [{
            model: Blog,
            as: 'readings',
            attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
            through: {
                attributes: ['read', 'id'],
                where: {
                    read: read
                }
            }
        }]
    })
    res.json(user)
})

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        if (error.name === 'SequelizeValidationError')
        res.status(400).send({ error: "Validation isEmail on username failed" })
    }
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    console.log(user)
    if (user) {
        user.username = req.body.username
        user.save()
        res.json(user)
    }
    else {
        res.status(404).end()
    }
})


module.exports = router