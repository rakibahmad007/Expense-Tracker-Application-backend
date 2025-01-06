import User from '../models/userModel.js'; // Use .js extension
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register function
export const register = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({ email, username, password: hashedPassword });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error('Registration error:', error);
        if (error.name === 'ValidationError') {
            // Handle Mongoose validation errors
            return res.status(400).json({ error: error.message });
        } else if (error.code === 11000) {
            // Handle duplicate key errors (e.g., duplicate email)
            return res.status(400).json({ error: 'Email already exists' });
        } else {
            // Handle other errors
            res.status(400).json({ error: error.message });
        }
    }
};

// Login function
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ error: error.message });
    }
};