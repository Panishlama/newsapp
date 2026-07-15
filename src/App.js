import "./App.css";

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App =()=> {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

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
          <Route
            exact
            path="/"
            key="general"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="us"
                category="general"
              />
            }
          />
          <Route
            exact
            path="/business"
            key="business"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="us"
                category="business"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            key="entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="us"
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/general"
            key="general"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="us"
                category="general"
              />
            }
          />
          <Route
            exact
            path="/health"
            key="health"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="us"
                category="health"
              />
            }
          />
          <Route
            exact
            path="/science"
            key="science"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="us"
                category="science"
              />
            }
          />
          <Route
            exact
            path="/sports"
            key="sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="us"
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/technology"
            key="technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="us"
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;