import Header from './Header'
import { useState } from 'react';
import loginService from "../services/login"
import blogService from "../services/blogs"
import { useLoginReducer, useHeaderReducer } from '../HeaderContext';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from "@mui/material";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [header, headerDispatch] = useHeaderReducer();
    const [login, loginDispatch] = useLoginReducer();

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const user = await loginService.login({ username, password });
    
          window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    
          blogService.setToken(user.token);
          loginDispatch({ type: "LOGIN", payload: user});
          setUsername("");
          setPassword("");
          navigate('/')
        } catch (exception) {
          headerDispatch({ type: "MESSAGE", payload: "Wrong credentials." });
          setTimeout(() => headerDispatch({ type: "CLEAR" }), 5000);
        }
      };

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
            <div>
                username{" "}
                <TextField
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                id="username"
                />
            </div>
            <div>
                password{" "}
                <TextField
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                id="password"
                />
            </div>
            <Button variant="contained" color="primary" type="submit" id="login-button">
                login
            </Button>
            </form>
        </div>
    );
  }

export default Login