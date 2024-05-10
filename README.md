# Task Management App README

## Overview

This Task Management App is a full-stack web application built to efficiently manage tasks. Users can register, log in, and perform various task-related operations such as creating, editing, prioritizing, setting due dates, marking tasks as completed, filtering, and searching. The backend is developed using Node.js and Express.js, with MySQL as the database. The frontend is developed using React.

## Features

- **User Authentication**: Users can securely register and log in to access their tasks.
- **CRUD Operations**: Users can perform Create, Read, Update, and Delete operations on tasks.
- **Task Prioritization**: Tasks can be prioritized as high, medium, or low.
- **Due Dates**: Users can set due dates for tasks to manage deadlines effectively.
- **Task Completion**: Users can mark tasks as completed.
- **Filtering and Searching**: Tasks can be filtered based on completion status and searched by title or description.
- **Responsive Design**: The application is responsive and adapts to different screen sizes.

## Backend

### Technologies Used

- **Node.js**: JavaScript runtime environment for server-side development.
- **Express.js**: Web application framework for Node.js, used for building APIs.
- **MySQL**: Relational database management system for storing user data and tasks.
- **JWT (JSON Web Tokens)**: Used for secure user authentication.

### API Endpoints

- **POST /auth/signup**: Register a new user.
- **POST /auth/login**: Log in an existing user.
- **GET /tasks/:userId**: Get all tasks for the logged-in user.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:taskId**: Update an existing task.
- **DELETE /tasks/:taskId**: Delete a task.

### Installation

1. Clone the repository.
2. Navigate to the backend directory (`/server`).
3. Run `npm install` to install dependencies.
4. Set up MySQL database and update the connection configuration in `/src/config/database.js`.
5. Run `npm start` to start the backend server.

## Frontend

### Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: Routing library for React applications.
- **Axios**: Promise-based HTTP client for making API requests.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Installation

1. Navigate to the frontend directory (`/frontend`).
2. Run `npm install` to install dependencies.
3. Update the API base URL in `/src/contsant.js` if necessary.
4. Run `npm start` to start the frontend development server.

## Conclusion

This Task Management App provides a simple yet effective solution for managing tasks. It demonstrates proficiency in full-stack development, secure user authentication, and efficient CRUD operations. The application is designed with user experience and responsiveness in mind, ensuring seamless usage across different devices.
