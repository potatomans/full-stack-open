const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  })

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(req.params.id)
  if (decodedToken.id.toString() !== blog.user.toString()) {
    return res.status(401).json({ error: 'permission denied: wrong user' })
  }
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const blog = req.body

    const newBlog = {
        "title": blog.title,
        "author": blog.author,
        "url": blog.url,
        "likes": blog.likes
    }

    updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true, runValidators: true })
    res.json(updatedBlog)
})

module.exports = blogsRouter  