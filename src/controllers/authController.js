import User, { findOne } from '../models/userModel';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export async function register(req, res) {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
