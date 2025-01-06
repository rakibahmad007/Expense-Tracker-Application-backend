
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            retryWrites: true,
            w: 'majority',
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

// Export the connectDB function
export default connectDB;