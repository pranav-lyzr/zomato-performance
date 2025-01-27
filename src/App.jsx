import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./FirstPage";
import NextPage from "./NextPage";
import "./App.css";
import PerformanceReport from "./PerformanceReport";
import Employee from "./Employee";
import Coach from "./Coach";
import Goals from "./Goals";
import Reports from "./Reports";
import Guidelines from "./Guidelines";
import Sidebar from "./Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/next" element={<NextPage />} />
        <Route path="/performance-report" element={<><Sidebar/><Employee /></>} />
        <Route path="/AI-coach" element={<> <Sidebar/> <Coach /> </>} />
        <Route path="/things-to-work-on" element={<><Sidebar/><Goals /></>} />
        <Route path="/performance-reports" element={<><Sidebar/><Reports /></>} />
        <Route path="/analysis-guidelines" element={<><Sidebar/><Guidelines /></>} />
        {/* <Route path="/user-setup" element={<><Sidebar/><Reports /></>} /> */}
        {/* <Route path="/employee" element={<Employee />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
