import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
    createPost,
    getAllPosts,
    getUserPosts,
    likePost,
} from '../controllers/post.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:userId/posts', getUserPosts);
router.post('/create', verifyToken, upload.single('picture'), createPost);
router.patch('/:id/like', verifyToken, likePost);

export default router;
