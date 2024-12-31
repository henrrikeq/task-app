import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiAddTask } from "../services/task";
import { toast } from "react-toastify";
import "./AddTask.css";

const AddTask = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    completionFlag: "notStarted",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (formData.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters long.";
    }
    if (formData.description.trim().length < 5) {
      errors.description = "Description must be at least 5 characters long.";
    }
    if (!formData.dueDate) {
      errors.dueDate = "Due date must be a valid date.";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    try {
      await apiAddTask(formData);
      toast.success("Task added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding task:", error);
      const errorMessage =
        error.response?.data?.message || "Error adding task.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="img">
      <p className="add-task-container text-[2rem] font-semibold">Add New Task</p>
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-inner-container">
          <div className="form-input-container">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-input"
              name="title"
              id="title"
              value={formData.title}
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
              value={formData.description}
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
              value={formData.dueDate}
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
              value={formData.completionFlag}
              onChange={handleChange}
            >
              <option value="notStarted">Not Started</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <button className="save-button mt-3" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddTask;
