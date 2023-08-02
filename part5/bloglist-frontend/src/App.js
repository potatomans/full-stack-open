import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NoteForm from './components/NoteForm'
import blogService from './services/blogs'
import loginService from './services/login'

const Header = ({ message }) => {
  const font = {
    color: 'blue',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }
  return (
    <div style={font}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = (blogObj) => {
    blogService.newBlog(blogObj).then(returnedBlog => setBlogs(blogs.concat(returnedBlog)))
  }

  const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogVisible ? '' : 'none' }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Header message={message} />
        <form onSubmit={handleLogin}>
          <div>username <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} id='username'/></div>
          <div>password <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} id='password'/></div>
          <button type="submit" id='login-button'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Header message={message} />
      <p>{user.name} logged in <button type="submit" onClick = {handleLogout} id='logout'>logout</button></p>
      <div style={hideWhenVisible}>
        <button onClick={() => setNewBlogVisible(true)} id='new-blog'>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <NoteForm createBlog={addBlog} />
        <button onClick={() => setNewBlogVisible(false)}>cancel</button>
      </div>
      <div className='blogs'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlogs={() => setBlogs(blogs)} handleLike={() => blogService.addLike(blog)} userId={user.id} />
        )}
      </div>
    </div>
  )
}

export default App