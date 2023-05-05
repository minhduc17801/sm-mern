import Post from '../models/Post.js';
import User from '../models/User.js';

// POST /create
export const createPost = async (req, res) => {
    try {
        const { userId, description } = req.body;
        console.log(userId, description);
        if (userId !== req.user.id)
            return res.status(403).json({ msg: 'access denied' });
        const newPost = new Post({
            user: userId,
            description,
            picturePath: req.file ? req.file.filename : '',
            likes: [],
        });
        await newPost.save();
        const posts = await Post.find()
            .populate('user')
            .sort({ createdAt: -1 });
        res.status(201).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user')
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

//GET /:userId/posts
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({
            user: userId,
        })
            .populate('user')
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

//PATCH /:id/like
export const likePost = async (req, res) => {
    try {
        const { userId } = req.body;
        const { id } = req.params;
        if (userId !== req.user.id)
            return res.status(403).json({ msg: 'access denied' });
        const post = await Post.findById(id);
        const isLiked = post.likes.some((user) => user == userId);
        if (isLiked) {
            post.likes = post.likes.filter(
                (user) => user.toString() !== userId
            );
        } else {
            post.likes.push(userId);
        }
        const postPopulated = await post.populate('user');
        post.save();
        res.status(200).json(postPopulated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
