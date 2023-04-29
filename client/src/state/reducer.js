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
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.posts = [];
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            state.user.friends = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload._id) return action.payload;
                return post;
            });
            state.posts = updatedPosts;
        },
    },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
    rootSlice.actions;

export default rootSlice.reducer;
