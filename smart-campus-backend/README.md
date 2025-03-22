# Smart Campus Management System - Backend API

This is the backend API for the Smart Campus Management System, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, JWT)
- Role-based access control (admin, lecturer, student)
- Event management
- Class scheduling
- Resource reservations
- Notifications

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

## Installation

1. Clone the repository
```
git clone https://github.com/yourusername/smart-campus-management.git
cd smart-campus-backend
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/smart_campus
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

4. Start the server
```
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/validate` - Validate token

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/register` - Register for event
- `DELETE /api/events/:id/register` - Cancel event registration

### Schedule
- `GET /api/schedule/user` - Get user's schedule
- `GET /api/schedule/:id` - Get class schedule by ID

### Reservations
- `GET /api/reservations` - Get user's reservations
- `GET /api/reservations/:id` - Get reservation by ID

### Notifications
- `GET /api/notifications` - Get user's notifications
- `GET /api/notifications/unread-count` - Get unread notification count
- `PUT /api/notifications/:id/read` - Mark notification as read

## Directory Structure

- `/src` - Source code
  - `/controllers` - Request handlers
  - `/models` - Mongoose models
  - `/routes` - API routes
  - `/middleware` - Custom middleware
  - `/config` - Configuration files
  - `/utils` - Utility functions
  - `server.js` - Main application file

## Development

```
npm run dev
```

## Production

```
npm start
```

## License

This project is licensed under the MIT License. 