# 📱 IMOB301 Assignment 1 – Android Task Management System

This project is an Android application developed using **Java** for the IMOB301 module. It serves as a simplified **Learning Management System (LMS)**, enabling different user roles (Admin, Instructor, Student) to manage modules and student tasks.

## 📦 Project Overview

The app supports **CRUD operations** for modules, students, and tasks, with distinct user experiences based on role-based access control.

## 👤 User Roles and Features

### 🧑‍🎓 Student
- Log in to view assigned tasks.
- Mark tasks as complete or incomplete.

### 🧑‍🏫 Instructor
- Log in and create tasks for students.
- Assign tasks to modules with a due date.

### 🧑‍💼 Admin
- Create and manage:
  - Student records
  - Module records
  - Instructor records

## 🔐 Authentication & Navigation
- Role-based login screen to direct users to appropriate dashboards.
- Each user role has its own **Navigation Activity** with relevant screens.
- All major features are isolated in their own **Activity classes**.

## 🧰 Tech Stack
- Android Studio
- Java
- XML Layouts
- Local storage (SQLite or in-memory depending on the version)

## 🎬 Presentation
- Link to the demo video: https://drive.google.com/file/d/1OiQfr5i_Py4_-7YsAjK6I_jRJ53inbC4/view?usp=drive_link

## 👨‍👩‍👧‍👦 Group Info
This was a group assignment.


## 📁 Project Structure
- `LoginActivity.java`
- `StudentDashboard.java`, `InstructorDashboard.java`, `AdminDashboard.java`
- `CreateTaskActivity.java`, `ViewTasksActivity.java`
- `AddModuleActivity.java`, `AddStudentActivity.java`, etc.

## 🚨 Note
This application was developed for academic purposes and is a prototype showcasing core Android development concepts with Java. Not intended for production use without enhancements.

---

