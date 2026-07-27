import "./App.css";

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_GNEWS_API_KEY;

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
          color="#f11946"
          progress={progress}
        />
        <Routes>
          {/* your routes remain exactly the same */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
