import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/Post';
import { setPosts } from '../../state/reducer';
import { useEffect } from 'react';
const PostsWidget = ({ userId, isProfile = false }) => {
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
        </>
    );
};

export default PostsWidget;
