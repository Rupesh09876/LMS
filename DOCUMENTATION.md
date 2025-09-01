Library Management System 

1. Introduction

The Library Management System (laibrary-01) is a cross-platform solution designed to manage library operations such as user management, book CRUD operations, borrowing/returning, and feedback. It is composed of a backend API, a frontend web app, and a mobile application.

2. Project Overview

The system enables:
• Librarians to manage books, users, and feedback.
• Borrowers to browse, borrow/return books, and submit feedback.
• Full-stack integration between backend, frontend, and mobile.
• Secure authentication with JWT and role-based access control.

 3. Tech Stack

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, multer, cookie-parser, dotenv, cors

Frontend: React, Vite, react-router-dom, axios, chart.js/react-chartjs-2

Mobile App: Expo, React Native, NativeWind (Tailwind CSS), React Navigation, TypeScript

4. Backend

 Setup:
1. cd backend
2. Install dependencies: `npm install`
3. Create .env file with MONGODB_URI and TOKEN_SECRET
4. Run server: `npm run dev`

Instructions to Run:
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



Default Admin Account:
Email: `librarian_admin@gmail.com`
Password: `librarian`



Project Structure:
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

5. Frontend

Setup:
1. cd frontend
2. Install dependencies: `npm install`
3. Run: `npm run dev`


nstructions to Run:
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

Project Structure:
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

Frontend Flows: Registration/Login, Admin Dashboard (book & user management), User Dashboard (browse/borrow books, feedback).

6. Mobile App (Expo)

Setup:
1. cd mobile
2. Install dependencies: `npm install`
3. Run: `npx expo start`

Instructions to Run:
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

Mobile App Testing:**
- Install Expo Go app on your mobile device
- Scan QR code from terminal
- Test on physical device or emulator

Project Structure:
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

Authentication Flow: Registration → Login → JWT storage → Protected routes

Navigation Flow: Drawer + Tab navigation for app sections

Styling: Tailwind CSS via NativeWind, custom fonts and images

7. Complete System Setup

Prerequisites:
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git
- Code editor VS Code 

Full Setup Commands:
```bash
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

Environment Variables (.env):
```env
MONGODB_URI="mongodb+srv://rupeshkatuwal53_db_user:Phonex123@cluster0.nbzvozd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET= "a-string-secret-at-least-256-bits-long"

NODE_ENV="development"

EMAIL_USERNAME= "rupeshkatuwal53@gmail.com"

EMAIL_PASSWORD= "blxm zpzy nvnn jjzv"

PORT = 3000

```

8. Useful Links
 
• Backend: server.js, routes, controllers, utils, middleware
• Frontend: App.jsx, API config, Protected Routes
• Mobile App: app folder with screens and layouts
 

URL of Projects:
⁃	Backend URL: https://lms-g2f1.onrender.com

⁃	Frontend Web URL: https://lms-tl38.vercel.app/


⁃	Mobile App URL: https://expo.dev/preview/update?message=Initial+public+share&updateRuntimeVersion=1.0.0&createdAt=2025-08-31T05%3A33%3A37.028Z&slug=exp&projectId=8fd8ea2a-bfe5-43c9-ab92-5685b0310dcc&group=2ef47e22-bc22-44b0-8a73-16cdce4be119

⁃	Figma URL:https://www.figma.com/design/w0KaK8F2wOQV0o8Skvp3Oz/Library-Management-System?node-id=0-1&t=84i9pgXwfAX7lKeI-1

⁃	Figma Web Prototype: https://www.figma.com/proto/w0KaK8F2wOQV0o8Skvp3Oz/Library-Management-System?page-id=0%3A1&node-id=215-30&p=f&viewport=1048%2C148%2C0.1&t=yODw7DFtZinRY35q-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=215%3A30&show-proto-sidebar=1


⁃	Figma Mobile Prototype: https://www.figma.com/proto/w0KaK8F2wOQV0o8Skvp3Oz/Library-Management-System?page-id=245%3A2379&node-id=251-2389&viewport=644%2C137%2C0.37&t=CepP9NRCyvgypmuw-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=251%3A2389

