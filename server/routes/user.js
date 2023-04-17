import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/user.js';

const router = express.Router();

router.get('/:id/friends', verifyToken, getUserFriends);
router.get('/:id', verifyToken, getUser);

router.patch('/:id/:fiendId', verifyToken, addRemoveFriend);

export default router;
