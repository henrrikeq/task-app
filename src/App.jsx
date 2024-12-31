import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import ViewTask from "./pages/ViewTask";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/view/:id" element={<ViewTask />} />
      </Routes>
    </Router>
  );
}

export default App;
