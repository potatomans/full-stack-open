const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user').populate('comments')
    response.json(blogs)
  })

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  return res.json(blog)
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
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const newBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: user.id
    }

    updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true, runValidators: true })
    res.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  // verify that user is logged in
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(req.params.id)
  const comment = new Comment({
    content: req.body.content,
    blog: blog.id
  })

  savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  res.json(savedComment)
})

module.exports = blogsRouter  