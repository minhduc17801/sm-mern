import express from 'express';
import upload from '../middleware/upload.js';
import { register, login } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', upload.single('image'), register);
router.post('/login', login);

export default router;
