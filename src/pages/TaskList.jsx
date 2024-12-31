import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetTasks, apiDeleteTask } from "../services/task";
import "./TaskList.css";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await apiGetTasks();
      if (Array.isArray(response.data.todos)) {
        setTasks(response.data.todos);
        toast.success("Tasks loaded successfully!");
      } else {
        console.error("Unexpected response format:", response.data);
        setTasks([]);
        toast.error("Failed to load tasks.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      const errorMessage =
        error.response?.data?.message || "Error fetching tasks.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await apiDeleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      const errorMessage =
        error.response?.data?.message || "Error deleting task.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="img" >
      <div className="task-list-container">
      <div>
        <p className="task-header">Tasks</p>
        <p className="task-subheader">List of Tasks</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="task-container">
        {filteredTasks.length > 0 ? (
          currentTasks.length > 0 ? (
            currentTasks.map((task, index) => (
              <div key={index} className="task-item">
                <p>Task: {task.title}</p>
                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p>Status: {task.status}</p>
                <div className="button-container">
                  <Link to={`/edit/${task._id}`} className="edit-button">
                    <FaEdit /> Edit
                  </Link>
                  <Link to={`/view/${task._id}`} className="view-button">
                    <FaEye /> View
                  </Link>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="delete-button"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks found on this page</p>
          )
        ) : (
          <p>No tasks match your search</p>
        )}

        {filteredTasks.length > 0 && (
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(filteredTasks.length / tasksPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className="page-button"
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}

        <Link to="/addtask" className="add-button">
          Add Task
        </Link>
      </div>
      </div>
    </div>
  );
};

export default TaskList;
