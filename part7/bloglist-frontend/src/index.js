import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HeaderContextProvider } from "./HeaderContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(    
    <HeaderContextProvider>
        <Router>
            <App />
        </Router>  
    </HeaderContextProvider> 
    );
