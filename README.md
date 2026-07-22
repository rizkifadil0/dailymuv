# Daily Tracker & Dashboard Application

A full-stack daily life management web application built with **Node.js**, **Express.js**, **EJS**, and **MongoDB**. This application features daily journaling, task management, real-time weather tracking via the Open-Meteo API, and secure user authentication. It is fully deployed on a Linux VPS with custom domain mapping and SSL/TLS encryption via Certbot.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Deployment](#-architecture--deployment)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
- [Project Structure](#-project-structure)
- [API Routes & Endpoints](#-api-routes--endpoints)
- [Security Features](#-security-features)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## ✨ Features

- **User Authentication & Authorization**:
  - Secure registration and login system.
  - Protected routes restricting unauthorized access to user dashboard and features.
  - Session / Token-based authentication.

- **Daily Journaling**:
  - Create new journal entries to reflect on daily experiences.
  - View existing journal records.
  - Delete journal entries.

- **Task Management (To-Do List)**:
  - Add new tasks with deadlines/priorities.
  - Mark tasks as completed or remove unwanted tasks.

- **Real-Time Weather Widget**:
  - Live weather forecasts fetched dynamically using the [Open-Meteo API](https://open-meteo.com/).
  - City-based weather lookup and conditions tracking.

---

## 🛠️ Tech Stack

### Frontend & Backend

- **Server Environment**: Node.js
- **Web Framework**: Express.js
- **Templating Engine**: EJS (Embedded JavaScript)
- **Database**: MongoDB (with Mongoose ODM)

### DevOps & Infrastructure

- **Hosting**: Linux VPS (Virtual Private Server)
- **Web Server / Reverse Proxy**: Nginx
- **Process Manager**: Docker
- **Security / SSL**: Let's Encrypt (Certbot) for HTTPS encryption
- **Version Control**: Git & GitHub

---

## 🏗️ Architecture & Deployment

The application is deployed on a Linux VPS architecture configured as follows:

1. **Reverse Proxy**: Nginx routes external HTTP/HTTPS traffic to the Express.js application server running locally on the VPS.
2. **Process Management**: Docker keeps the Node.js application running continuously in the background and restarts it automatically on failure or reboot.
3. **SSL Certificates**: TLS/SSL certificates generated via Certbot ensure end-to-end encrypted HTTPS connection.

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB](https://www.mongodb.com/) (Local server or MongoDB Atlas cluster)
- [Git](https://git-scm.com/)

### Environment Variables

Create a `.env` file in the root directory and add the following configuration variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/daily_db
JWT_SECRET=your_super_secret_session_key
```

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd dailymuv
   ```

2. **build with compose to install Dependencies and run**:

   ```bash
   docker compose up --build -d
   ```

3. **Access the App**:
   Open your browser and navigate to `http://localhost:3000`.

---

## 📁 Project Structure

```text
├── config/             # Database connection & third-party configs
├── controllers/        # Route logic (Auth, Journal, Task, Weather)
├── middleware/         # Custom middleware (Authentication check, error handlers)
├── models/             # Mongoose schemas (User, Journal, Task)
├── public/             # Static assets (CSS, JS, Images, Icons)
│   ├── css/
│   └── js/
├── routes/             # Express routes definition
├── views/              # EJS template files
│   ├── partials/       # Header, footer, navbar components
│   ├── auth/           # Login & Register views
│   └── dashboard/      # Journal, Tasks, & Weather views
├── .env.example        # Sample environment setup file
├── .gitignore          # Git ignore rules
├── app.js              # Express app entry point
└── package.json        # Dependencies and scripts
```

---

## 🛣️ API Routes & Endpoints

| Method            | Endpoint               | Description                           | Protected |
| :---------------- | :--------------------- | :------------------------------------ | :-------: |
| `GET`             | `/`                    | Home / Landing Page                   |    No     |
| `GET`             | `/auth/login`          | Login page view                       |    No     |
| `POST`            | `/auth/login`          | Authenticate user session             |    No     |
| `GET`             | `/auth/register`       | Registration page view                |    No     |
| `POST`            | `/auth/register`       | Create a new user account             |    No     |
| `GET`             | `/dashboard`           | Main dashboard view                   |  **Yes**  |
| `POST`            | `/journals`            | Create a new journal entry            |  **Yes**  |
| `DELETE` / `POST` | `/journals/:id/delete` | Delete a journal entry                |  **Yes**  |
| `POST`            | `/tasks`               | Create a new task                     |  **Yes**  |
| `DELETE` / `POST` | `/tasks/:id/delete`    | Delete a task                         |  **Yes**  |
| `GET`             | `/weather`             | Fetch weather forecast via Open-Meteo |  **Yes**  |

---

## 🔒 Security Features

- Password hashing using `bcrypt` / `argon2`.
- Secure HTTP cookies with `HttpOnly` and `SameSite` flags.
- HTTPS encryption enabled via Certbot / Let's Encrypt on production VPS.
- Input validation & sanitization to prevent injection attacks.
