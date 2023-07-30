const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

initialBlogs = [
    {
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    },
    {
      id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    },
    {
      id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }  
  ]

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const result = blogObjects.map(blogObj => blogObj.save())
    await Promise.all(result)
}, 10000)

test('blogs are returned as json', async () => {
    await api   
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
}, 100000)

test('blogs have a valid id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('blogs can be posted', async () => {
    const newBlog = {
        "title": "Geronimo Stilton",
        "author": "Mr Geronimo Stilton",
        "url": "geronimostilton.com",
        "likes": 3
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)

    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain('Geronimo Stilton')
})  

test('likes default to zero if missing', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.likes).toBeDefined())
})

test('title required', async () => {
    const noTitle = {
        "author": "Mr Geronimo Stilton",
        "url": "geronimostilton.com",
        "likes": 3
    }
    await api
        .post('/api/blogs')
        .send(noTitle)
        .expect(400)
})

test('url required', async () => {
    const noUrl = {
        "title": "Geronimo Stilton",
        "author": "Mr Geronimo Stilton",
        "likes": 3
    }
    await api
        .post('/api/blogs')
        .send(noUrl)
        .expect(400)
})

test('able to delete blog', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    
    expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1)

    const blogTitles = blogsAtEnd.body.map(blog => blog.title)
    expect(blogTitles).not.toContain(blogToDelete.title)
})

test('able to update blog post', async () => {
    const newBlog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 15,
    }
    blogsAtStart = await api.get('/api/blogs')
    blogToUpdate = blogsAtStart.body.find(blog => blog.title === newBlog.title)
    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)
    
    const blogsAtEnd = await api.get('/api/blogs')
    updatedBlog = blogsAtEnd.body.find(blog => blog.title === newBlog.title)
    expect(updatedBlog.likes).toEqual(newBlog.likes)
})

afterAll(async () => {
    await mongoose.connection.close()
})
