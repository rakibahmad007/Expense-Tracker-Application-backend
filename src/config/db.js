import mongoose from 'mongoose';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const connectDB = async () => {
    try {
        // Ensure the MONGO_URI environment variable is defined
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in the environment variables.');
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Recommended for Mongoose 5.x
            useUnifiedTopology: true, // Recommended for Mongoose 5.x
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with a failure code
    }
};

// Export the connectDB function
export default connectDB;