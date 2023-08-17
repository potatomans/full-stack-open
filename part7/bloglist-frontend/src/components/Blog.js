import blogService from "../services/blogs"
import { useHeaderReducer } from "../HeaderContext"
import { useState } from "react"

const Blog = ({ blog, user }) => {
  const [header, headerDispatch] = useHeaderReducer()
  const [comment, setComment] = useState('')

  const handleLike = () => {
    blogService.addLike(blog)
    headerDispatch({ type: "MESSAGE", payload: `liked "${blog.title}" by ${blog.author}`})
    setTimeout(() => headerDispatch({ type: "CLEAR"}), 5000)
  }

  const addComment = () => {
    blogService.addComment(blog.id, comment)
    headerDispatch({ type: "MESSAGE", payload: `comment added "${comment}"`})
    setTimeout(() => headerDispatch({ type: "CLEAR"}), 5000)
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={handleLike} className="like">like</button></div>
      <div>added by {user.name}</div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input type="text" onChange={({ target }) => setComment(target.value)}/>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment._id}>{comment.content}</li>)}
      </ul>
    </div>
  )
}

export default Blog