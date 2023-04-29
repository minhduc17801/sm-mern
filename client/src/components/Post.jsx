import WidgetWrapper from './WidgetWrapper';
import Friend from './Friend';
import FlexBetween from './FlexBetween';
import { Typography, useTheme, IconButton, Box, Divider } from '@mui/material';
import {
    ShareOutlined,
    ChatBubbleOutlineOutlined,
    FavoriteOutlined,
    FavoriteBorderOutlined,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setPost } from '../state/reducer';

const Post = ({
    _id,
    userId,
    lastName,
    firstName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const { palette } = useTheme();
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const patchLike = async () => {
        try {
            const res = await fetch(`http://localhost:3001/post/${_id}/like`, {
                method: 'PATCH',
                headers: {
                    authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: loggedInUserId }),
            });

            const post = await res.json();
            dispatch(setPost(post));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                _id={userId}
                lastName={lastName}
                firstName={firstName}
                occupation={location}
                picturePath={userPicturePath}
            />
            <Typography color={palette.neutral.main} sx={{ mt: '1rem' }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined
                                    sx={{ color: palette.primary.main }}
                                />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={i}>
                            <Divider />
                            <Typography
                                sx={{
                                    color: palette.neutral.main,
                                    m: '0.5rem 0',
                                    pl: '1rem',
                                }}
                            >
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default Post;
