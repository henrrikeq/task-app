import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetSingleTask } from "../services/task";
import "./ViewTask.css";

const ViewTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const response = await apiGetSingleTask(id);
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="img">
      <h2 className="text-[2rem] font-semibold flex justify-center items-center">Task Details</h2>
      <div className=" view-task-container">
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Status:</strong> {task.completionFlag}
      </p>
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      </div>
    </div>
  );
};

export default ViewTask;
