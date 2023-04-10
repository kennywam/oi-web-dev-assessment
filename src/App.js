import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import adminRoutes from "./routes/admin"; // Import the adminRoutes module
import app from "./Server/server.js";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    axios
      .get("/admin")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Render data from backend */}
        <h3>{data}</h3>
      </header>
    </div>
  );
}

export default App;

// Use adminRoutes as middleware for the desired admin dashboard URL
app.use("/admin", adminRoutes);
