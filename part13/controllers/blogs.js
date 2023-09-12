const router = require('express').Router()

const jwt = require('jsonwebtoken')
const { Blog, User }  = require('../models')
const { SECRET } = require('../util/config')
const { Op } = require('sequelize')

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

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        include: {
            model: User,
            attributes: ['name']
        },
        where: {
            [Op.or]: {
                title: req.query.search ? {[Op.match]: req.query.search} : {[Op.substring]: ''}, 
                author: req.query.search ? {[Op.match]: req.query.search} : {[Op.substring]: ''}
            }
        },
        order: [['likes', 'DESC']]
    })
    res.json(blogs)
  })

router.get('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        res.json(blog)
    }
    else {
        res.status(404).end()
    }
})
  
router.post('/', tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({...req.body, userId: user.id})
        res.json(blog)
    } catch (error) {
        if (error.name === 'SequelizeValidationError')
        res.status(400).send({ error: "invalid blog year" })
    }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (req.decodedToken.id === blog.userId) {
        const blog = await Blog.destroy({
            where: {
            id: req.params.id
        }})
        res.status(204).end()
    }
    else {
        res.status(400).json({ error: 'cannot delete note as user did not create it' })
    }

})

router.put('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        blog.likes = req.body.likes
        blog.save()
        res.json(blog)
    }
    else {
        res.status(404).end()
    }
})

module.exports = router