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
            const res = await fetch(`${process.env.REACT_APP_API_URL}/post`);
            const posts = await res.json();
            dispatch(setPosts(posts));
        } catch (error) {
            console.log(error);
        }
    };
    const getUserPosts = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/post/${userId}/posts`
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {posts.map((post, index) => (
                <Post
                    key={index}
                    {...post}
                    userImgId={post.user.imgId}
                    userId={post.user._id}
                />
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
