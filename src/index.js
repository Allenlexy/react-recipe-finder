import React from "react";
import ReactDOM from "react-dom"; // Note: 'react-dom/client' is not available in React 17

import App from "./App";

// Use ReactDOM.render for React 17
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
