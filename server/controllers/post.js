import Post from '../models/Post.js';
import User from '../models/User.js';

// POST /create
export const createPost = async (req, res) => {
    try {
        const { userId, description } = req.body;
        if (userId !== req.user.id)
            return res.status(403).json({ msg: 'access denied' });
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath: req.file ? req.file.filename : '',
            likes: {},
            comments: [],
        });
        await newPost.save();
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

//GET /:userId/posts
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId }).sort({ createdAt: -1 });
        console.log(posts);
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
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        post.save();
        // const updatedPost = await Post.findOneAndUpdate(
        //     id,
        //     { likes: post.likes },
        //     { new: true }
        // );
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
