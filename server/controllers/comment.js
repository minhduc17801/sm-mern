import Comment from '../models/Comment.js';

// GET /:postId
export const getPostComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const comment = await Comment.find({ post: postId }).populate('user');
        res.status(200).json(comment);
    } catch (err) {
        res.status(404).json(err);
    }
};

// POST /create

export const createComment = async (req, res) => {
    try {
        const { postId, description } = req.body;
        const newComment = new Comment({
            user: req.user.id,
            description,
            post: postId,
        });
        await newComment.save();
        const allComments = await Comment.find({
            post: postId,
        }).populate('user');
        res.status(200).json(allComments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PATCH /:cmtId/like
export const patchLikeComment = async (req, res) => {
    try {
        const cmtId = req.params.cmtId;
        const userId = req.body.userId;
        const comment = await Comment.findById(cmtId);
        if (comment.likes.includes(userId)) {
            comment.likes.splice(comment.likes.indexOf(userId), 1);
        } else {
            comment.likes.push(userId);
        }
        await comment.save();
        const allComments = await Comment.find({
            post: comment.post,
        }).populate('user');
        res.status(200).json(allComments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
