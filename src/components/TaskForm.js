import React, { useState, useEffect } from "react";
import axios from '../utility/axiosConfig'; 
import { host } from "../constant";

const TaskForm = ({ toggleForm, selectedTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });
  const { id } = JSON.parse(localStorage.getItem("user"));
  const userId = id;

  useEffect(() => {
    if (selectedTask) {
      //edit functionality data
      setFormData({
        title: selectedTask.title || "",
        description: selectedTask.description || "",
        priority: selectedTask.priority || "",
        dueDate: selectedTask.dueDate || "",
        completed: selectedTask.completed || 0,
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTask) {
        // If selectedTask exists, it means we're editing
        await axios.put(`${host}/tasks/${selectedTask.id}`, formData);
        alert("Task edited successfully");
      } else {
        // Otherwise, we're adding a new task
        await axios.post(`${host}/tasks`, { ...formData, userId });
        alert("Task Added successfully");
      }

      toggleForm();
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("SomeThing Went Wrong");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full sm:max-w-md flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="priority" className="block font-medium mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block font-medium mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={toggleForm}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {selectedTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
