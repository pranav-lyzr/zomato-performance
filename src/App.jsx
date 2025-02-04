import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Employee from "./Employee";
import Coach from "./Coach";
import Goals from "./Goals";
import Reports from "./Reports";
import Guidelines from "./Guidelines";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function App() {
  const [userRole, setUserRole] = useState("employee");
  const [prevRole, setPrevRole] = useState("employee"); // Track previous role
  const navigate = useNavigate();

  // Default pages for each role
  const roleDefaultPages = {
    employee: "/",
    admin: "/performance-reports",
  };

  // Redirect ONLY when role actually changes
  useEffect(() => {
    if (userRole !== prevRole) {
      navigate(roleDefaultPages[userRole]);
      setPrevRole(userRole); // Update previous role
    }
  }, [userRole, prevRole, navigate]);

  return (
    <>
      <Navbar onRoleChange={setUserRole} />
      <Sidebar currentRole={userRole} />
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/AI-coach" element={<Coach />} />
        <Route path="/things-to-work-on" element={<Goals />} />
        <Route path="/performance-reports" element={<Reports />} />
        <Route path="/analysis-guidelines" element={<Guidelines />} />
      </Routes>
    </>
  );
}

export default App;
