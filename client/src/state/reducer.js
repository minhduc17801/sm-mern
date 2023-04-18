import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
};

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode !== 'light' ? 'light' : 'dark';
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setFriends: (state, action) => {
            state.user.friends = action.payload.friends;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id)
                    return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
    },
});

export const { setMode, setUser, setFriends, setPosts, setPost } =
    rootSlice.actions;

export default rootSlice.reducer;
