# Virtual Classroom Platform

A full-stack Virtual Classroom Platform built using the MERN stack, designed to support online learning through classroom management, enrollment workflows, live sessions, learning materials, and role-based access control.

The platform provides separate experiences for teachers and students while following scalable frontend and backend architecture principles.

---

## Overview

The application enables teachers to create and manage classes, schedule live sessions, upload learning materials, and approve student enrollment requests. Students can discover classes, request enrollment, access study materials, and participate in live sessions.

The project focuses on:

* Full-stack MERN development
* JWT Authentication
* Role-Based Access Control (RBAC)
* Session Lifecycle Management
* Scalable Architecture
* Centralized State Management
* Real-Time Classroom Collaboration

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent Login Sessions
* Role-Based Access Control

### Teacher Features

* Create and Manage Classes
* View Owned Classes
* Schedule Sessions
* Start Live Sessions
* Upload Learning Materials
* Review Enrollment Requests
* Approve Student Access

### Student Features

* Browse Available Classes
* Request Enrollment
* Access Learning Materials
* Join Live Sessions
* View Enrolled Classes

### Session Management

* Schedule Sessions
* Start Sessions
* End Sessions
* Session Lifecycle Tracking

Session States:

text
Scheduled
    ↓
Live
    ↓
Unstable
    ↓
Live / Ended


### Video Conferencing

* Jitsi Meet Integration
* Automatic Meeting Link Generation
* Direct Session Joining

### Learning Materials

* Upload Study Resources
* Retrieve Class Materials
* Material Metadata Management

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Redux Toolkit
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO

### Video Integration

* Jitsi Meet

---

## Project Structure

text
virtual-classroom/
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── App.jsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   └── utils/
│
└── README.md


---

## Architecture

### Frontend Architecture

The frontend follows a layered architecture:

text
Pages
   ↓
Components
   ↓
Redux Features
   ↓
Services
   ↓
Backend APIs


Responsibilities:

* Reusable UI Components
* Centralized State Management
* API Communication
* Route Protection
* Authentication Handling

---

### Backend Architecture

The backend follows a service-layer architecture:

text
Route
   ↓
Controller
   ↓
Service
   ↓
Model
   ↓
Database


Principles:

* Thin Controllers
* Business Logic in Services
* Centralized Error Handling
* Modular Design
* Role-Based Authorization

---

## Authentication Flow

text
Login
   ↓
Backend Validation
   ↓
JWT Generation
   ↓
Store Token
   ↓
Protected Route Access


---

## Enrollment Workflow

text
Student
   ↓
Request Enrollment
   ↓
Pending Request
   ↓
Teacher Review
   ↓
Approval
   ↓
Class Access Granted


---

## Live Session Workflow

text
Teacher
   ↓
Schedule Session
   ↓
Create Session
   ↓
Start Session
   ↓
Generate Jitsi Link
   ↓
Session Goes Live


Student Flow:

text
View Session
   ↓
Join Session
   ↓
Open Jitsi Meeting


---

## State Management

Redux Toolkit is used for centralized state management.

Feature Modules:

* Authentication
* Classes
* Sessions
* Materials
* Enrollments

Async operations are implemented using:

javascript
createAsyncThunk()


---

## Environment Variables

### Backend

env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

VIDEO_PROVIDER=jitsi

VIDEO_BASE_URL=https://meet.jit.si


### Frontend

env
VITE_API_URL=http://localhost:5000/api


---

## Installation

### Clone Repository

bash
git clone <repository-url>


### Navigate to Project

bash
cd virtual-classroom


### Install Backend Dependencies

bash
cd server
npm install


### Install Frontend Dependencies

bash
cd ../client
npm install


### Start Backend

bash
cd ../server
npm run dev


### Start Frontend

bash
cd ../client
npm run dev


---

## Learning Outcomes

This project demonstrates practical experience with:

* Full-Stack MERN Development
* React Component Architecture
* Redux Toolkit State Management
* REST API Design
* JWT Authentication
* Role-Based Access Control
* Socket.IO Integration
* Session Lifecycle Management
* MongoDB Data Modeling
* Scalable Frontend & Backend Architecture

---

## Future Improvements

* Assignment Submission System
* Attendance Tracking
* Notification System
* File Storage Integration
* Real-Time Classroom Events
* WebSocket-Based Live Updates
* Analytics Dashboard

---


Built as a learning project focused on full-stack architecture, authentication systems, scalable application design, and real-world development workflows.
