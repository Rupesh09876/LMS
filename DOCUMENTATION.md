# Library Management System (laibrary-01) - Documentation

## 1. Introduction

The Library Management System (laibrary-01) is a cross-platform solution designed to manage library operations such as user management, book CRUD operations, borrowing/returning, and feedback. It is composed of a backend API, a frontend web app, and a mobile application.

## 2. Project Overview

The system enables:
• Librarians to manage books, users, and feedback.
• Borrowers to browse, borrow/return books, and submit feedback.
• Full-stack integration between backend, frontend, and mobile.
• Secure authentication with JWT and role-based access control.

## 3. Tech Stack

**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, multer, cookie-parser, dotenv, cors

**Frontend**: React, Vite, react-router-dom, axios, chart.js/react-chartjs-2

**Mobile App**: Expo, React Native, NativeWind (Tailwind CSS), React Navigation, TypeScript

## 4. Backend

### Setup:
1. Clone repository
2. cd backend
3. Install dependencies: `npm install`
4. Create .env file with MONGODB_URI and TOKEN_SECRET
5. Run server: `npm start`

### Instructions to Run:
```bash
# Navigate to backend directory
cd LMS_Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env file with your MongoDB URI and JWT secret

# Start the server
npm run dev
# or
npm start
```

**Default Admin Account:**
- Email: `librarian_admin@gmail.com`
- Password: `librarian`

### Project Structure:
```
backend/
├── server.js
├── .env
├── uploads/
└── src/
    ├── controllers/
    ├── database/db.js
    ├── middlewares/
    ├── models/
    ├── routes/
    └── utils/
```

API Routes include authentication, user, book, borrow/return, and feedback endpoints.

## 5. Frontend

### Setup:
1. Clone repository
2. cd frontend
3. Install dependencies: `npm install`
4. Run: `npm run dev`

### Instructions to Run:
```bash
# Navigate to frontend directory
cd LMS_Frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Access the application at:** `http://localhost:5173`

### Project Structure:
```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── assets/
├── App.jsx
├── main.jsx
└── vite.config.js
```

**Frontend Flows**: Registration/Login, Admin Dashboard (book & user management), User Dashboard (browse/borrow books, feedback).

## 6. Mobile App (Expo)

### Setup:
1. Clone repository
2. cd mobile
3. Install dependencies: `npm install`
4. Run: `npx expo start`

### Instructions to Run:
```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start Expo development server
npm start
# or
npx expo start

# For specific platforms
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

**Mobile App Testing:**
- Install Expo Go app on your mobile device
- Scan QR code from terminal
- Test on physical device or emulator

### Project Structure:
```
mobile/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── (drawer)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── (tabs)/
│       ├── home.tsx
│       └── profile.tsx
├── assets/
├── global.css
└── tailwind.config.js
```

**Authentication Flow**: Registration → Login → JWT storage → Protected routes

**Navigation Flow**: Drawer + Tab navigation for app sections

**Styling**: Tailwind CSS via NativeWind, custom fonts and images

## 7. Complete System Setup

### Prerequisites:
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git
- Code editor (VS Code recommended)

### Full Setup Commands:
```bash
# Clone the repository
git clone <your-repository-url>
cd "Library Management System"

# Backend Setup
cd LMS_Backend
npm install
cp .env.example .env
# Edit .env file with your configuration
npm run dev

# Frontend Setup (new terminal)
cd ../LMS_Frontend
npm install
npm run dev

# Mobile Setup (new terminal)
cd ../mobile
npm install
npm start
```

### Environment Variables (.env):
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your_secret_key_here
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

## 8. Useful Links

• **Backend**: server.js, routes, controllers, utils, middleware
• **Frontend**: App.jsx, API config, Protected Routes
• **Mobile App**: app folder with screens and layouts

---

**Note**: Replace placeholder URLs with actual deployment URLs when available:
- Backend API: [YOUR_BACKEND_URL]
- Frontend Web App: [YOUR_FRONTEND_URL]
- Mobile App: [YOUR_MOBILE_APP_LINK]
