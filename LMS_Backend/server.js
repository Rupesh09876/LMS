import express from "express";
import dotenv from "dotenv";
import dbConnection from "./src/database/db.js";
import router from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import User from "./src/models/user.model.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// ✅ CORS configuration (simplified + correct)
const allowedOrigins = [
  "http://localhost:5173",        // local frontend
  "https://lms-tl38.vercel.app",  // production frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// Routes
app.use("/api", router);

// Connect to database and start server
dbConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is listening at http://localhost:${port}`);
    });
    seedLibrarian();
  })
  .catch((err) => {
    console.log("Connection error", err.message);
    process.exit(1);
  });

// Seed default librarian
const seedLibrarian = async () => {
  try {
    const librarian = await User.findOne({ email: "librarian_admin@gmail.com" });
    if (!librarian) {
      const hashedPassword = await bcrypt.hash("librarian", 10);

      await User.create({
        name: "Rupesh Katuwal",
        email: "librarian_admin@gmail.com",
        password: hashedPassword,
        role: "librarian",
        profileImage: "spider.png",
        isDeleted: false,
      });

      console.log("Default librarian created.");
    }
 } catch (error) {
  console.error("❌ Failed to seed data:", error.message);
}
};

export default app;
