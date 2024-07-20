Certainly! Here’s the updated README file that specifies Node.js version 18.17.0 or greater for both the front end and backend.

---

# Crypto Tracker Project

## Overview

This project is a Crypto Tracker application with a frontend built using Next.js and a backend built using Express and TypeScript. The application displays cryptocurrency details fetched from an API and includes features such as a data table and dropdowns using Ant Design (antd).

## Prerequisites

- Node.js (version 18.17.0 or greater)
- npm or yarn

## Project Structure

- `crypto-tracker-fe`: Contains the frontend code using Next.js.
- `crypto-tracker-be`: Contains the backend code using Express and TypeScript.

## Setup Instructions

### Backend

1. **Navigate to the backend directory:**
    cd crypto-tracker-be

2. **Ensure you are using Node.js version 18.17.0 or greater:**
    node -v

    If you are not using the correct version, consider using [nvm](https://github.com/nvm-sh/nvm) to install and manage Node.js versions.

    nvm install 18.17.0
    nvm use 18.17.0

3. **Install dependencies:**
    npm install

4. **Start the backend server:**
    npm run start_ts

5. **The backend server will be running on:**
    http://localhost:3000

### Frontend

1. **Navigate to the frontend directory:**

    cd ../crypto-tracker-fe


2. **Ensure you are using Node.js version 18.17.0 or greater:**

    node -v
    

    If you are not using the correct version, consider using [nvm](https://github.com/nvm-sh/nvm) to install and manage Node.js versions.

    nvm install 18.17.0
    nvm use 18.17.0
  

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env.local` file in the root of the `frontend` directory and add the following environment variable:**

    NEXT_PUBLIC_API_URL=http://localhost:5000


    Replace `http://localhost:5000` with the actual URL of your backend API if it's different.

5. **Start the development server:**
    npm run dev
  

6. **Open your browser and navigate to:**
    http://localhost:3001

## Scripts

### Frontend

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the application in production mode.
- `npm run lint`: Runs ESLint to lint the code.

### Backend

- `npm run start_ts`: Starts the backend server using ts-node.

## Usage

Once both the backend and frontend servers are running, you can use the Crypto Tracker application by navigating to `http://localhost:3001` in your browser. The frontend will communicate with the backend to fetch and display cryptocurrency data.

## Technologies Used

### Frontend

- Next.js
- React
- TypeScript
- Redux Toolkit
- Ant Design (antd)
- Axios
- Socket.IO Client

### Backend

- Express
- TypeScript
- Mongoose
- Axios
- Socket.IO
- dotenv
- Helmet
- Body-Parser
- CORS
- Boom

## Notes

- Ensure MongoDB is running locally or update the `MONGO_URI` in the `env.ts` file with your MongoDB connection string.
- Make sure to restart the servers if you make any changes to the environment variables.
