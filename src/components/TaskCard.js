import axios from '../utility/axiosConfig'; 
import React from "react";
import { host } from "../constant";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const TaskCard = ({ task, refetch, onEdit }) => {
  const handleDelete = async (taskId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
      );

      if (confirmDelete) {
        await axios.delete(`${host}/tasks/${taskId}`);

        refetch();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error in Deleting Task");
    }
  };

  const handleToggleCompleted = async (taskId) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`${host}/tasks/${taskId}`, updatedTask);

      refetch();
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const handleEdit = () => {
    onEdit(task);
  };

  return (
    <div className="bg-blue-50 shadow-md rounded-lg p-4 mb-4 text-center">
      <div className="font-bold text-xl mb-2">{task.title}</div>
      <div className="text-gray-700 mb-2">Priority: {task.priority}</div>
      <div className="text-gray-700 mb-4">{task.description}</div>
      <div className="flex justify-center items-center space-x-4 mb-4">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <FiEdit className="text-xl" />
        </button>
        <button
          onClick={() => handleDelete(task.id)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          <FiTrash2 className="text-xl" />
        </button>
      </div>
      <div className="flex justify-center items-center mb-4">
        <input
          type="checkbox"
          className="h-5 w-5 rounded-full border-2 border-blue-500 appearance-none checked:bg-blue-500 checked:border-blue-500 checked:outline-none checked:border-transparent focus:outline-none"
          checked={task.completed}
          onChange={() => handleToggleCompleted(task.id)}
        />
        <label className="ml-2 text-gray-700">
          {task.completed ? "Completed" : "Mark as completed"}
        </label>
      </div>
      <div className="text-gray-700 text-sm">Due Date: {task.dueDate}</div>
    </div>
  );
};

export default TaskCard;
