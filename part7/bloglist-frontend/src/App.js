import { useState, useEffect, useContext } from "react";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import { Container } from '@mui/material'
import User from "./components/User"
import Users from "./components/Users"
import Login from "./components/Login"
import Header from "./components/Header"
import blogService from "./services/blogs";
import userService from "./services/users"
import { useLoginReducer, useHeaderReducer } from "./HeaderContext";
import {
  BrowserRouter as Router,
  Routes, Route,
  useMatch,
  Navigate
} from 'react-router-dom'

const Home = ({ blogs, users, addBlog }) => {
  const [newBlogVisible, setNewBlogVisible] = useState(false);
  const [header, headerDispatch] = useHeaderReducer();
  const [login, loginDispatch] = useLoginReducer();

  return (
    <div>
    <Blogs blogs={blogs} addBlog={addBlog} />
    <Users users={users} />
  </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [login, loginDispatch] = useLoginReducer(); // details of logged in user
  const [users, setUsers] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [blogs]);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [users])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      loginDispatch({ type: "LOGIN", payload: user});
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (blogObj) => {
    blogService
      .newBlog(blogObj)
      .then((returnedBlog) => setBlogs(blogs.concat(returnedBlog)));
  };

  const userMatch = useMatch('/users/:id')
  const user = userMatch ? users.find(user => user.id === userMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

  return (
    <Container>
      <div>
        {login ? <Header /> : null}
      </div>

      <Routes>
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/users" element={<Users users={users}/>} />
        <Route path="/blogs/:id" element={<Blog blog={blog} user={login} /> } />
        <Route path="/blogs" element={<Blogs blogs={blogs} addBlog={addBlog} /> } />
        <Route path="/" element={login ? <Home blogs={blogs} users={users} addBlog={addBlog} /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Container>
  );
};

export default App;