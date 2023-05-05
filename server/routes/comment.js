import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
    getPostComment,
    patchLikeComment,
    createComment,
} from '../controllers/comment.js';

const router = express.Router();

router.get('/:postId', getPostComment);

router.post('/create', verifyToken, createComment);

router.patch('/:cmtId/like', verifyToken, patchLikeComment);

export default router;
