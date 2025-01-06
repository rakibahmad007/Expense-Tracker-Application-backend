import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

const User = model('User', userSchema);

export default User;
