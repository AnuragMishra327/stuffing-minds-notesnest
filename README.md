# NotesNest — Academic Notes Marketplace

> A React and Firebase-based platform created for **Stuffing Minds**, an educational YouTube channel, to provide students with easy access to academic notes and study materials.

**NotesNest** is a web application developed for the **Stuffing Minds** educational platform. It allows students to browse academic notes, submit payment requests, and access their approved study materials through a personalized **My Purchases** section.

## 🎓 Made for Stuffing Minds

**NotesNest was created specifically for the [Stuffing Minds](https://www.youtube.com/@stuffingminds-withanuragmi5405) YouTube channel and its student community.**

The platform is designed to provide students with an organized and convenient way to access the academic notes and study materials associated with the channel.

📺 **Stuffing Minds YouTube Channel:**
https://www.youtube.com/@stuffingminds-withanuragmi5405

## 🌐 Live Website

**NotesNest:**
https://stuffing-minds-notesnest.netlify.app/

## ✨ Features

* 📚 Browse available academic notes
* 💳 Submit payment requests for notes
* 📄 Access purchased PDF study materials
* 🔐 Google authentication for students
* 🛒 Personalized **My Purchases** section
* 👨‍💼 Admin panel for managing payment requests
* ✅ Approve or manage student purchase requests
* 📱 Responsive user interface
* 📲 Progressive Web App configuration
* 🔒 Firebase Firestore security rules
* ⚡ Fast React + Vite frontend

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend & Services

* Firebase Authentication
* Firebase Firestore

### Deployment & Version Control

* Netlify
* GitHub

## 🔄 How NotesNest Works

### 👨‍🎓 Student Flow

```text
Browse Notes
     ↓
Select a Note
     ↓
Open Payment Modal
     ↓
Submit Payment Request
     ↓
Admin Reviews Request
     ↓
Request Approved
     ↓
Note Appears in My Purchases
     ↓
Open PDF
```

### 👨‍💼 Admin Flow

```text
Admin Login
     ↓
Admin Panel
     ↓
View Payment Requests
     ↓
Review Transaction Details
     ↓
Approve / Manage Request
     ↓
Student Gets Access
```

## 🔐 Authentication

NotesNest uses **Firebase Authentication with Google Sign-In**.

Students authenticate with their Google account before accessing their purchase history.

The admin panel is restricted to the authorized administrator account through Firebase Authentication and Firestore security rules.

## 🗄️ Firestore

The application uses **Firebase Firestore** to manage application data, including:

* Available notes
* Payment requests
* Purchase information
* Transaction details
* Approval status

The `paymentRequests` collection contains information such as:

```text
name
email
subject
title
noteId
price
transactionId
status
createdAt
pdf
```

## 📁 Project Structure

```text
stuffing-minds-notesnest/
│
├── public/
│   ├── pdfs/
│   │   ├── Web-Technology-Sem-5-Syllabus.pdf
│   │   ├── Web-Technology-Unit-1-Part-1.pdf
│   │   └── Web-Technology-Unit-1-Part-2.pdf
│   │
│   ├── favicon.svg
│   ├── icons.svg
│   ├── manifest.webmanifest
│   ├── notesnest-192.png
│   ├── notesnest-512.png
│   ├── notesnest-icon.png
│   ├── upi-qr.png
│   └── _redirects
│
├── src/
│   ├── assets/
│   ├── components/
│   │   └── PaymentModal.jsx
│   │
│   ├── Admin.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── firebase.js
│   ├── index.css
│   ├── main.jsx
│   └── MyPurchases.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/AnuragMishra327/stuffing-minds-notesnest.git
```

### 2. Navigate into the project

```bash
cd stuffing-minds-notesnest
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Firebase

Create a `.env` file in the project root and add your Firebase configuration variables.

Example:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Important:** Never commit your `.env` file or expose sensitive configuration in the repository.

### 5. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## ☁️ Deployment

NotesNest is deployed using **Netlify**.

The Vite production build is generated using `npm run build` and deployed through Netlify.

## 🔒 Security

NotesNest uses multiple mechanisms to protect application data:

* Environment variables are excluded from Git using `.gitignore`.
* Firebase Authentication is used for user authentication.
* Firestore security rules control access to payment requests.
* Students can access only their own approved purchase records.
* Administrative operations are restricted to the authorized administrator account.

## 📱 Progressive Web App

NotesNest includes PWA-related configuration such as:

* Web app manifest
* Application icons
* Favicon
* Netlify redirects configuration

This provides a foundation for an installable web-app experience.

## 🔮 Future Improvements

Potential future improvements include:

* 💳 Online payment gateway integration
* 🤖 Automated payment verification
* 🔎 Search and filtering for notes
* 📚 More subjects and semesters
* 👤 User profile management
* ⬇️ Improved download management
* 🧾 Purchase receipts
* 📊 Admin analytics
* ☁️ Cloud-based PDF storage
* 📧 Automated email notifications

## Developer

**Anurag Mishra**

B.Tech CSE 3rd Year | PSIT Kanpur

### GitHub

https://github.com/AnuragMishra327

### YouTube — Stuffing Minds

https://www.youtube.com/@stuffingminds-withanuragmi5405

## 📄 License

This project is currently intended for educational and project demonstration purposes.
