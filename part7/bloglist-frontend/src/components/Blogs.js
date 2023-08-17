import { useState } from "react";
import NoteForm from "./NoteForm";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Blogs = ({ blogs, addBlog }) => {
  const [newBlogVisible, setNewBlogVisible] = useState(false);

  const hideWhenVisible = { display: newBlogVisible ? "none" : "" };
  const showWhenVisible = { display: newBlogVisible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  /*
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id);
      updateBlogs();
    }
  };
  */
  return (
    <div>
      <h2>blog app</h2>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={() => setNewBlogVisible(true)} id="new-blog">
          new blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <NoteForm createBlog={addBlog} />
        <Button variant="contained" color="primary" onClick={() => setNewBlogVisible(false)}>cancel</Button>
      </div>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
      ))}
    </div>
  )
};

export default Blogs;

/*
return (
    <div style={blogStyle} className="collapse">
      {blog.title} {blog.author}{" "}
      <button
        style={showWhenVisible}
        onClick={() => setBlogVisible(false)}
        className="view"
      >
        view
      </button>
      <button style={hideWhenVisible} onClick={() => setBlogVisible(true)}>
        hide
      </button>
      <div style={hideWhenVisible} className="expand">
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{" "}
          <button onClick={handleLike} className="like">
            like
          </button>
        </p>
        <p>{blog.user ? blog.user.name : null}</p>
        {userId === blog.user.id ? (
          <button onClick={handleDelete} className="delete">
            delete
          </button>
        ) : null}
      </div>
    </div>
  );
  */
