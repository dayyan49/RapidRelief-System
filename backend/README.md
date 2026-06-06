# Intelligent Disaster Management System — Backend

A scalable disaster management backend system built using Node.js, Express.js, MongoDB, Python FastAPI, Machine Learning, and KD-tree spatial optimization.

---

# 🚀 Features

## 🔐 Authentication & Authorization
- JWT authentication
- Session management
- Role-based access control
- User / Rescue / Admin roles

---

## 🚨 Incident Management
- Create disaster incidents
- Track incident lifecycle
- Store geolocation data
- Real-time updates

---

## 🚑 Rescue Management
- Rescue personnel verification
- Task assignment
- Rescue status tracking
- Document uploads

---

## 🧠 ML + Optimization
- Python FastAPI ML microservice
- Multi-output regression
- Predict:
  - rescue teams
  - ambulances
  - food packets
  - medical kits
- KD-tree nearest rescue allocation

---

## ⚡ Real-Time System
- Socket.IO integration
- Live incident updates
- Rescue tracking
- Status notifications

---

## ☁️ Cloud Integration
- MongoDB Atlas
- Cloudinary document storage

---

# 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express.js |
| Database | MongoDB |
| ML Service | FastAPI |
| ML Library | scikit-learn |
| Spatial Optimization | SciPy KD-tree |
| Real-Time | Socket.IO |
| Cloud Storage | Cloudinary |

---

# 📁 Backend Structure

```bash
backend/
│
│──Node_backend
│   │
│   ├── src/
│   │   │
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── uploads/
│   │   └── app.js
│   │
│   │──.env
│   │── index.js
│   ├── package-lock.json
│   └── package.json
│ 
│
│──Python_backend
│   │
│   ├── app/
│   │   │
│   │   ├── ml/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── spatial/
│   │
│   │── __pycachae__
│   │── main.py
│   └── requirement.txt
│
└── README.md
```

## ⚙️ Installation

# 1. Clone Repository

```bash
git clone <repository_url>
```

# 2. Install Dependencies

```bash
npm install
```

# 3. Create .env

```bash
PORT=3000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

PYTHON_SERVICE_URL=http://localhost:5001

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

## ▶️ Run Backend
# Development Mode

```bash
npm start
```

## 🧠 Python ML Service

# The backend communicates with a separate Python FastAPI service for:

ML prediction
KD-tree allocation

Python service runs on:

```bash
http://localhost:5001
```

## 📡 API Modules

Module	Endpoint
Auth	/api/auth/*
Incident	/api/incidents/*
Rescue	/api/rescue/*
Assignment	/api/assignments/*
Admin	/api/admin/*

## 🔐 Authentication

Uses:

JWT tokens
Session model validation

Protected routes require:
```bash
Authorization: Bearer <token>
```

## 📂 File Uploads

Uploads handled using:

Multer
Cloudinary

Supported file types:

PDF
JPG
PNG
## ⚡ Real-Time Events

Socket.IO events include:

incident updates
rescue assignments
status changes
live tracking
## 🧠 Machine Learning

The ML pipeline predicts:

teams required
ambulances required
food packets required
medical kits required

Based on:

severity
population
disaster type
rainfall
infrastructure damage
road blockage
medical need level
more

## 🌍 Spatial Optimization

KD-tree nearest-neighbor search is used to:

locate nearest rescue teams
optimize response allocation


## 🛡️ Security Features
Password hashing using bcrypt
JWT authentication
Role-based authorization
Session tracking
File validation
Protected upload routes
## 🚀 Future Improvements
Live map tracking
Offline-first support
SMS/Satellite fallback
Advanced analytics
Traffic-aware routing
AI-based prioritization

## 👨‍💻 Author

Aditya Verma

Aditya Singh

## 📜 License

This project is for educational and research purposes.