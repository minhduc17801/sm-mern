import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
    createPost,
    deletePost,
    getAllPosts,
    getUserPosts,
    likePost,
} from '../controllers/post.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:userId/posts', getUserPosts);
router.post('/create', verifyToken, upload.single('image'), createPost);
router.patch('/:id/like', verifyToken, likePost);
router.delete('/:id/delete', verifyToken, deletePost);

export default router;
