import React, { useState, useEffect } from "react";
import axios from '../utility/axiosConfig'; 
import { host } from "../constant";
import Navbar from "./Navbar";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { debounce } from "lodash";

const Browse = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { id } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log("useEffect called");
    fetchTasks();
  }, [id, showForm, filter, sortOrder, searchTerm]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${host}/tasks/${id}`);
      let filteredTasks = response.data;

      if (filter === "completed") {
        filteredTasks = filteredTasks.filter((task) => task.completed);
      } else if (filter === "notCompleted") {
        filteredTasks = filteredTasks.filter((task) => !task.completed);
      }

      const priorityValues = {
        low: 1,
        medium: 2,
        high: 3,
      };

      filteredTasks.sort((a, b) => {
        const priorityA = priorityValues[a.priority];
        const priorityB = priorityValues[b.priority];

        if (sortOrder === "asc") {
          return priorityA - priorityB;
        } else {
          return priorityB - priorityA;
        }
      });

      // Filter tasks based on search term
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setSelectedTask(null);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  return (
    <div className="browse-page">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center mt-4 gap-3 items-center">
        <div className="">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="notCompleted">Not Completed</option>
          </select>
        </div>
        <div className="">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option>Arrange Priority</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded ml-4"
        />
      </div>

      <div className="flex justify-center">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full m-4"
          onClick={toggleForm}
        >
          Add New Task
        </button>
      </div>

      {showForm && (
        <div className="flex justify-center">
          <TaskForm toggleForm={toggleForm} selectedTask={selectedTask} />
        </div>
      )}
      <div className="task-list-container flex justify-center m-4">
        <div className="flex justify-center gap-5 flex-wrap">
          {tasks &&
            tasks.length > 0 &&
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                refetch={fetchTasks}
                onEdit={handleEditTask}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
