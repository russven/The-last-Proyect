import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../admin/index.css"

//preparemos la aplicacion en react
ReactDOM.createRoot(document.getElementById("root")).render(
  // crear una instrucion para encontrar errores mientras ejecuta
<React.StrictMode> 
    <App />
</React.StrictMode>
)
