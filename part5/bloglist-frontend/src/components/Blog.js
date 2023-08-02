import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogs, handleLike, userId }) => {
  const [blogVisible, setBlogVisible] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id)
      updateBlogs()
    }
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired
  }
  
  return (
    <div style={blogStyle} className='collapse'>
      {blog.title} {blog.author} <button style={showWhenVisible} onClick={() => setBlogVisible(false)} className='view'>view</button><button style={hideWhenVisible} onClick={() => setBlogVisible(true)}>hide</button>
      <div style={hideWhenVisible} className='expand'>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handleLike} className='like'>like</button></p>
        <p>{blog.user ? blog.user.name : null}</p>
        {userId === blog.user.id ? <button onClick={handleDelete} className='delete'>delete</button> : null}
      </div>
    </div> 
  ) 
}

export default Blog