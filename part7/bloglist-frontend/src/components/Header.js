import { useHeaderReducer, useLoginReducer } from "../HeaderContext";
import { Link } from "react-router-dom";

const Header = () => {
    const [header, headerDispatch] = useHeaderReducer()
    const [login, loginDispatch] = useLoginReducer()
  
    const font = {
      color: "blue",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };

    const handleLogout = async (event) => {
        event.preventDefault();
    
        window.localStorage.removeItem("loggedBlogAppUser");
        loginDispatch({ type: "LOGOUT" });
      };
    if (!login) {
        return null
    }
    return (
      <div>
        <div>
            <Link to="/">Home</Link> <Link to="/blogs">Blogs</Link> <Link to="/users">Users</Link>
        </div>
          {login.name} logged in{" "}
          <button type="submit" onClick={handleLogout} id="logout">
            logout
          </button>
        <div>{header ? <div style={font}>{header}</div> : null}</div>
      </div>
    )
  };

export default Header