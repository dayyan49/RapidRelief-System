# RapidRelief - Frontend

## Overview

RapidRelief is an Intelligent Disaster Management System designed to improve disaster response through real-time coordination, resource allocation, and AI-assisted decision making.

The frontend provides separate interfaces for:

* Citizens (Users)
* Rescue Personnel
* Administrators

The application is built using React, Vite, Tailwind CSS, Axios, React Router, Socket.IO, and React Leaflet.

---

## Features

### Citizen Features

* User Registration and Login
* Report Disaster Incidents
* Request Emergency Assistance
* Track Incident Status
* View Nearby Assistance Centers
* View Safe Zones and Shelters

### Rescue Personnel Features

* Rescue Dashboard
* Assigned Mission Management
* Live Incident Tracking
* Availability Updates
* Profile Management
* Document Verification Status

### Administrator Features

* Incident Monitoring
* Rescue Personnel Verification
* Resource Management
* Analytics Dashboard
* AI Resource Prediction Monitoring
* System Monitoring

### Real-Time Features

* Live Incident Updates
* Rescue Assignment Notifications
* Status Tracking
* Socket.IO Integration

### Mapping Features

* Incident Locations
* Rescue Team Locations
* Assistance Centers
* Safe Zones
* Live Tracking

---

## Tech Stack

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| React            | Frontend Framework      |
| Vite             | Build Tool              |
| Tailwind CSS     | Styling                 |
| React Router DOM | Routing                 |
| Axios            | API Requests            |
| Socket.IO Client | Real-Time Communication |
| React Leaflet    | Interactive Maps        |

---

## Project Structure

```bash
src/
│
├── api/
│   ├── axios.js
│   ├── auth.api.js
│   ├── incident.api.js
│   ├── rescue.api.js
│   └── admin.api.js
│
├── assets/
│
├── components/
│   ├── common/
│   ├── auth/
│   ├── incident/
│   ├── rescue/
│   ├── admin/
│   └── maps/
│
├── context/
│   ├── AuthContext.jsx
│   ├── SocketContext.jsx
│   └── NotificationContext.jsx
│
├── hooks/
│
├── layouts/
│
├── pages/
│   ├── auth/
│   ├── user/
│   ├── rescue/
│   └── admin/
│
├── routes/
│
├── services/
│
├── utils/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate To Frontend

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the frontend root.

```env
VITE_API_URL=/api
VITE_SOCKET_URL=http://localhost:8000
VITE_BACKEND_URL=http://localhost:8000
```

---

## Run Development Server

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## Build For Production

```bash
npm run build
```

---

## Backend Integration

The frontend communicates with:

### Node.js Backend

```text
http://localhost:8000/api
```

### Python ML Service

Resource prediction requests are handled through the backend, which communicates with the FastAPI machine learning service.

---

## Authentication

Authentication is handled using:

* JWT Access Tokens
* Auth Context
* Protected Routes
* Role-Based Authorization

Roles:

* USER
* RESCUE
* ADMIN

---

## Future Enhancements

* Progressive Web App (PWA)
* Offline Incident Reporting
* Push Notifications
* Multi-language Support
* Dark Mode
* Advanced Analytics
* Satellite Communication Integration

---

## Author

Aditya Verma

---

## License

This project is developed for educational, research, and disaster management purposes.
