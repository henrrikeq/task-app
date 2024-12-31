import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetSingleTask, apiUpdateTask } from "../services/task";
import { toast } from "react-toastify";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    completionFlag: "notStarted",
  });
  const [errors, setErrors] = useState({});

  const fetchTask = async () => {
    try {
      const response = await apiGetSingleTask(id);
      const taskData = response.data;
      taskData.dueDate = new Date(taskData.dueDate).toISOString().split("T")[0];
      setTask(taskData);
      toast.success("Task loaded successfully!");
    } catch (error) {
      console.error("Error fetching task:", error);
      const errorMessage =
        error.response?.data?.message || "Error fetching task.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (task.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters long.";
    }
    if (task.description.trim().length < 5) {
      errors.description = "Description must be at least 5 characters long.";
    }
    if (!task.dueDate) {
      errors.dueDate = "Due date must be a valid date.";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await apiUpdateTask(id, task);
      toast.success("Task updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating task:", error);
      const errorMessage =
        error.response?.data?.message || "Error updating task.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="img">
      <p className="edit-task-container text-[2rem] font-semibold ml-40">Edit Task</p>
      <form onSubmit={handleSubmit} className="edit-task-form">
        <div className="form-inner-container w-[50vw] h-[70vh] flex flex-col justify-center ml-40">
          <div className="form-input-container">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-input"
              name="title"
              id="title"
              value={task.title}
              onChange={handleChange}
            />
            {errors.title && <p className="error-text">{errors.title}</p>}
          </div>

          <div className="form-input-container">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-input form-input-description"
              name="description"
              id="description"
              value={task.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="error-text">{errors.description}</p>
            )}
          </div>

          <div className="form-input-container">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              className="form-input"
              name="dueDate"
              id="dueDate"
              value={task.dueDate}
              onChange={handleChange}
            />
            {errors.dueDate && <p className="error-text">{errors.dueDate}</p>}
          </div>

          <div className="form-input-container">
            <label htmlFor="completionFlag">Completion Flag</label>
            <select
              className="form-input"
              name="completionFlag"
              id="completionFlag"
              value={task.completionFlag}
              onChange={handleChange}
            >
              <option value="notStarted">Not Started</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <button className="save-button ml-40 mt-4 w-[10vw]" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditTask;
