import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(
            `✅ MongoDB connected successfully!\n📌 Host: ${connectionInstance.connection.host}\n📂 Database: ${connectionInstance.connection.name}`
        );
    } catch (err) {
        console.error("❌ MongoDB connection failed!");
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default dbConnection;
