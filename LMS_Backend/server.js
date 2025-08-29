import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './src/database/db.js';
import router from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import User from './src/models/user.model.js';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// CORS configuration
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173', // local frontend
            'https://lms-frontend-vt4e.vercel.app' // production frontend
        ];

        // Allow requests with no origin (like Postman) or allowed origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

// Connect to database and start server
dbConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`App is listening at http://localhost:${port}`);
        });
        seedLibrarian();
    })
    .catch(err => {
        console.log('Connection error', err.message);
        process.exit(1);
    });

// Routes
app.use('/api', router);

// Seed default librarian
const seedLibrarian = async () => {
    try {
        const librarian = await User.findOne({ email: 'librarian_admin@gmail.com' });
        if (!librarian) {
            const hashedPassword = await bcrypt.hash('librarian', 10);

            await User.create({
                name: 'Rupesh Katuwal',
                email: 'librarian_admin@gmail.com',
                password: hashedPassword,
                role: 'librarian',
                profileImage: 'spider.png',
                isDeleted: false
            });

            console.log('Default librarian created.');
        }
    } catch (error) {
        console.log('Seed data failed', error.message);
    }
};

export default app;
