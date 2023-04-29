import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getUserSearch,
} from '../controllers/user.js';

const router = express.Router();

router.get('/:id/friends', getUserFriends);
router.get('/:id', getUser);
router.get('/find/:search', getUserSearch);

router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
