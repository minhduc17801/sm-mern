import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// POST /auth/register
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, location, occupation } =
            req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath: req.file.filename,
            location,
            occupation,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /auth/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }).lean();
        if (!user) return res.status(400).json({ msg: 'User does not exist,' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: 'Invalid credentials.' });
        delete user.password;
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_ACCESS_KEY,
            { expiresIn: 3600 }
        );
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
