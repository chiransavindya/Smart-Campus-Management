# Smart Campus Management - Frontend

<div align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  <img src="https://img.shields.io/badge/material--ui-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material UI">
  <img src="https://img.shields.io/badge/router-%23CA4245.svg?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router">
</div>

<p align="center">Modern, responsive web interface for the Smart Campus Management System.</p>

## ✨ Features

- 🔐 **Secure Authentication** - Login, registration, and password recovery
- 🎨 **Responsive Design** - Works on desktops, tablets, and mobile devices
- 👤 **User Profiles** - Personalized user experience based on roles
- 📅 **Interactive Calendars** - For events and reservations
- 🏢 **Room Booking System** - Reserve rooms and facilities
- 📚 **Resource Management** - Access and manage learning materials
- 📱 **Real-time Notifications** - Stay updated with campus activities

## 🛠️ Tech Stack

- **React.js** - Frontend library for building UI components
- **Material-UI** - React component library implementing Google's Material Design
- **React Router** - Navigation and routing solution
- **Context API** - State management
- **Axios** - HTTP client for API requests
- **JWT** - Token-based authentication

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/smart-campus-management.git
cd smart-campus-frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode at [http://localhost:3000](http://localhost:3000) |
| `npm test` | Launches the test runner in interactive watch mode |
| `npm run build` | Builds the app for production to the `build` folder |
| `npm run eject` | Ejects the app from Create React App configuration |

## 📁 Project Structure

```
smart-campus-frontend/
├── public/               # Static files
├── src/                  # Source files
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin specific pages
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # Dashboard pages
│   │   ├── events/       # Event management pages
│   │   ├── lecturer/     # Lecturer specific pages
│   │   ├── profile/      # User profile pages
│   │   ├── reservations/ # Reservation pages
│   │   ├── resources/    # Resource management pages
│   │   ├── schedule/     # Schedule pages
│   │   └── student/      # Student specific pages
│   ├── services/         # API services
│   ├── styles/           # CSS and style files
│   ├── App.js            # Main App component
│   └── index.js          # Entry point
└── package.json          # Dependencies and scripts
```

## 🎯 Role-based Features

### Student Portal
- View and manage personal schedule
- Reserve rooms and facilities
- Register for campus events
- Access learning resources
- Receive notifications

### Lecturer Portal
- Manage class schedules
- Reserve classrooms
- Upload and manage teaching materials
- Create and manage events
- Communicate with students

### Admin Dashboard
- User management
- System configuration
- Resource allocation
- Analytics and reporting
- Campus-wide notifications

## 📝 Environment Variables

Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_ENV=development
```

## 🔗 Connecting to Backend

The frontend connects to the backend API by default at `http://localhost:4000/api`. You can change this by modifying the `.env` file.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
