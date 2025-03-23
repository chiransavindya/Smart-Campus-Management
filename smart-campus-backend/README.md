# Smart Campus Management - Backend API

<div align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT">
</div>

<p align="center">Robust and scalable RESTful API for the Smart Campus Management System.</p>

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Database Schema](#-database-schema)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Lecturer, Student)
  - Password encryption & recovery

- 👥 **User Management**
  - Create, read, update, delete operations
  - Profile management 
  - Role assignment

- 🗓️ **Event Management**
  - Create and manage campus events
  - Event registration and attendance tracking
  - Notifications and reminders

- 📚 **Resource Management**
  - Digital learning materials
  - Document uploading and categorization
  - Access control based on user roles

- 🏢 **Reservation System**
  - Room and facility booking
  - Approval workflows
  - Schedule conflict prevention
  - Availability calendar

- 📊 **Analytics & Reporting**
  - Usage statistics
  - Attendance reports
  - Resource utilization metrics

- 📱 **Notification System**
  - Real-time alerts
  - Email notifications
  - Push notifications integration

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Express-validator** - Request validation
- **Multer** - File uploads handling
- **Nodemailer** - Email sending capabilities

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager
- Postman or similar tool for API testing (optional)

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/smart-campus-management.git
cd smart-campus-backend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/smart_campus
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

4. **Start the server**

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will run at `http://localhost:4000` by default.

## 📝 API Documentation

### Authentication Routes
| Method | Endpoint               | Description               | Access      |
|--------|------------------------|---------------------------|-------------|
| POST   | `/api/auth/register`   | Register a new user       | Public      |
| POST   | `/api/auth/login`      | Authenticate user         | Public      |
| GET    | `/api/auth/me`         | Get current user details  | Private     |
| GET    | `/api/auth/validate`   | Validate token            | Private     |

### User Routes
| Method | Endpoint         | Description           | Access      |
|--------|------------------|-----------------------|-------------|
| GET    | `/api/users`     | Get all users         | Admin only  |
| GET    | `/api/users/:id` | Get user by ID        | Private     |
| PUT    | `/api/users/:id` | Update user profile   | Private     |
| DELETE | `/api/users/:id` | Delete user           | Admin only  |

### Event Routes
| Method | Endpoint                      | Description              | Access      |
|--------|------------------------------ |--------------------------|-------------|
| GET    | `/api/events`                 | Get all events           | Private     |
| GET    | `/api/events/:id`             | Get event by ID          | Private     |
| POST   | `/api/events`                 | Create new event         | Lecturer/Admin |
| PUT    | `/api/events/:id`             | Update event             | Lecturer/Admin |
| DELETE | `/api/events/:id`             | Delete event             | Lecturer/Admin |
| POST   | `/api/events/:id/register`    | Register for event       | Student    |
| DELETE | `/api/events/:id/register`    | Cancel event registration| Student    |

### Resource Routes
| Method | Endpoint              | Description         | Access      |
|--------|---------------------- |---------------------|-------------|
| GET    | `/api/resources`      | Get all resources   | Private     |
| GET    | `/api/resources/:id`  | Get resource by ID  | Private     |
| POST   | `/api/resources`      | Add new resource    | Lecturer/Admin |
| PUT    | `/api/resources/:id`  | Update resource     | Lecturer/Admin |
| DELETE | `/api/resources/:id`  | Delete resource     | Lecturer/Admin |

### Reservation Routes
| Method | Endpoint                  | Description         | Access      |
|--------|---------------------------|---------------------|-------------|
| GET    | `/api/reservations`       | Get user reservations | Private     |
| GET    | `/api/reservations/:id`   | Get reservation by ID | Private     |
| POST   | `/api/reservations`       | Create reservation    | Private     |
| PUT    | `/api/reservations/:id`   | Update reservation    | Private     |
| DELETE | `/api/reservations/:id`   | Cancel reservation    | Private     |

### Notification Routes
| Method | Endpoint                       | Description               | Access      |
|--------|--------------------------------|---------------------------|-------------|
| GET    | `/api/notifications`           | Get user notifications    | Private     |
| GET    | `/api/notifications/unread-count` | Get unread count       | Private     |
| PUT    | `/api/notifications/:id/read`  | Mark notification as read | Private     |

## 📁 Project Structure

```
smart-campus-backend/
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── auth.js       # Authentication logic
│   │   ├── users.js      # User management
│   │   ├── events.js     # Event operations
│   │   ├── resources.js  # Resource management
│   │   ├── reservations.js # Reservation handling
│   │   └── notifications.js # Notification management
│   │
│   ├── models/           # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── event.model.js
│   │   ├── resource.model.js
│   │   ├── reservation.model.js
│   │   ├── schedule.model.js
│   │   └── notification.model.js
│   │
│   ├── routes/           # API route definitions
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── event.routes.js
│   │   ├── resource.routes.js
│   │   ├── reservation.routes.js
│   │   ├── schedule.routes.js
│   │   └── notification.routes.js
│   │
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js       # Authentication middleware
│   │   ├── error.js      # Error handling
│   │   └── validate.js   # Request validation
│   │
│   ├── config/           # Configuration
│   │   ├── db.js         # Database connection
│   │   └── passport.js   # Passport.js config
│   │
│   ├── utils/            # Utility functions
│   │   ├── validators.js # Input validation
│   │   ├── emailer.js    # Email functionality
│   │   └── logger.js     # Logging utility
│   │
│   └── server.js         # Express application setup
│
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── README.md             # Documentation
```

## 🔧 Development

Start development server with hot-reload:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Lint your code:

```bash
npm run lint
```

## 📊 Database Schema

The application uses MongoDB with Mongoose ODM to define structured schemas:

- **User**: Authentication details, profile information, role
- **Event**: Campus events, organizers, participants, schedules
- **Resource**: Learning materials, files, access permissions
- **Reservation**: Room bookings, time slots, approval status
- **Schedule**: Class timetables, recurring events
- **Notification**: System alerts, messages, read status

## 🔐 Security

This backend implements several security best practices:

- JWT-based authentication
- Password encryption using bcrypt
- CORS protection
- Rate limiting on authentication routes
- Input validation and sanitization
- Environment variable protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 