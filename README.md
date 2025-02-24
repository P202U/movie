# Movie App

This is a full-stack movie application that allows users to view, rate, and comment on movies. The app is structured with a backend API and a frontend UI.

## Prerequisites

Before running the app, make sure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Project Setup

The project is divided into two main parts:
1. Backend: The API layer built using Express and Prisma.
2. Frontend: The React application that interacts with the backend.

### 1. Backend Setup

1. Navigate to the backend folder:

    cd backend

2. Install the required dependencies:

    npm install

3. Start the backend server:

    npm run dev:start

   The backend will be running on http://localhost:5000 (or the port defined in your environment).

### 2. Frontend Setup

1. Navigate to the frontend folder:

    cd frontend

2. Install the required dependencies:

    npm install

3. Start the frontend server:

    npm run dev

   The frontend will be running on http://localhost:5173 by default.

## How to Use

- Visit http://localhost:3000 in your browser to interact with the application.
- View movies, rate them, and leave comments.
- The backend will handle user authentication, movie details, and comment system.

## Environment Variables

If you're working with environment variables, make sure to create .env files in both the backend and frontend directories. Example for backend:

