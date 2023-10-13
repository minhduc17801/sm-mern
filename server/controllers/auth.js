import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { uploadToDrive } from '../utils/googleDrive.js';
import fs from 'fs';

// POST /auth/register
export const register = async (req, res) => {
    try {
        let imgId = '';
        const { firstName, lastName, email, password, location, occupation } =
            req.body;
        // POST create chat engine user
        const buffer = fs.readFileSync(req.file.path);
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const myHeaders = new Headers();
        myHeaders.append('PRIVATE-KEY', '1efc4089-b2f2-40fa-94e7-54612d8ed6d7');
        const formData = new FormData();
        formData.append('avatar', blob, req.file.originalname);
        formData.append('username', email);
        formData.append('secret', email);
        formData.append('email', email);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        await fetch('https://api.chatengine.io/users/', {
            method: 'POST',
            headers: myHeaders,
            body: formData,
        });
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        if (req.file) {
            const drive = await uploadToDrive(req.file);
            imgId = drive.id;
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            imgId,
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
