import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/Post';
import { setPosts } from '../../state/reducer';
import { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
const PostsWidget = ({ userId, isProfile = false }) => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const getAllPosts = async () => {
        try {
            const res = await fetch('http://localhost:3001/post');
            const posts = await res.json();
            dispatch(setPosts(posts));
        } catch (error) {
            console.log(error);
        }
    };

    const getUserPosts = async () => {
        try {
            const res = await fetch(
                `http://localhost:3001/post/${userId}/posts`
            );
            const posts = await res.json();
            dispatch(setPosts(posts));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getAllPosts();
        }
    }, []);

    return (
        <>
            {posts.map((post, index) => (
                <Post key={index} {...post} />
            ))}
            {posts.length === 0 && (
                <Box textAlign="center">
                    <Typography variant="h1" color={palette.neutral.dark}>
                        No Post
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default PostsWidget;
