import WidgetWrapper from './WidgetWrapper';
import Friend from './Friend';
import FlexBetween from './FlexBetween';
import {
    Typography,
    useTheme,
    IconButton,
    Box,
    Divider,
    Button,
    InputBase,
} from '@mui/material';
import {
    ShareOutlined,
    ChatBubbleOutlineOutlined,
    FavoriteOutlined,
    FavoriteBorderOutlined,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPost } from '../state/reducer';
import UserImg from './UserImg';

const Post = ({
    _id,
    user,
    userId,
    description,
    userPicturePath,
    picturePath,
    likes,
}) => {
    const [cmtInput, setCmtInput] = useState('');
    const [comments, setComments] = useState([]);
    const { firstName, lastName, location } = user;
    const { palette } = useTheme();
    const loggedInUserId = useSelector((state) => state.user._id);
    const loggedInUserPicturePath = useSelector(
        (state) => state.user.picturePath
    );
    const isLiked = Boolean(likes.some((id) => id === loggedInUserId));
    const likeCount = Object.keys(likes).length;
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const patchLike = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/post/${_id}/like`,
                {
                    method: 'PATCH',
                    headers: {
                        authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: loggedInUserId }),
                }
            );
            const post = await res.json();
            dispatch(setPost(post));
        } catch (error) {
            console.log(error);
        }
    };

    const handleLikeComment = async (commentId) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/comment/${commentId}/like`,
                {
                    method: 'PATCH',
                    headers: {
                        authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: loggedInUserId }),
                }
            );
            const comments = await res.json();
            setComments(comments);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePostCmt = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/comment/create`,
                {
                    method: 'POST',
                    headers: {
                        authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        description: cmtInput,
                        postId: _id,
                    }),
                }
            );
            if (res.status < 400) {
                const comments = await res.json();
                setComments(comments);
                setCmtInput('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/comment/${_id}`
                );
                const rs = await res.json();
                setComments(rs);
            } catch (error) {
                console.log(error);
            }
        };
        getComments();
    }, []);

    return (
        <WidgetWrapper mb="2rem">
            <Friend
                friendId={userId}
                lastName={lastName}
                firstName={firstName}
                desc={location}
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
                    src={`${
                        import.meta.env.VITE_API_URL
                    }/assets/${picturePath}`}
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
                            <Box display="flex" pt="4px">
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '40px',
                                    }}
                                >
                                    <UserImg
                                        img={comment.user.picturePath}
                                        size="30px"
                                    />
                                    <IconButton
                                        onClick={() =>
                                            handleLikeComment(comment._id)
                                        }
                                    >
                                        {comment.likes.includes(
                                            loggedInUserId
                                        ) ? (
                                            <FavoriteOutlined
                                                sx={{
                                                    color: palette.primary.main,
                                                }}
                                            />
                                        ) : (
                                            <FavoriteBorderOutlined />
                                        )}
                                        <Typography>
                                            {comment.likes.length > 0 &&
                                                comment.likes.length}
                                        </Typography>
                                    </IconButton>
                                </Box>
                                <Box>
                                    <Typography pl="1rem" mt="2px">
                                        {comment.user.firstName +
                                            ' ' +
                                            comment.user.lastName}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: palette.neutral.main,
                                            m: '0.5rem 0',
                                            pl: '1rem',
                                        }}
                                    >
                                        {comment.description}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                    <Divider />
                    <FlexBetween gap="1rem" mt="8px">
                        <UserImg img={loggedInUserPicturePath} size="40px" />
                        <InputBase
                            value={cmtInput}
                            onChange={(e) => setCmtInput(e.target.value)}
                            placeholder="Write your comment"
                            sx={{
                                width: '100%',
                                backgroundColor: palette.neutral.light,
                                borderRadius: '1.5rem',
                                padding: '8px 16px',
                            }}
                        />
                        <Button
                            disabled={!cmtInput}
                            onClick={handlePostCmt}
                            sx={{
                                color: palette.background.alt,
                                backgroundColor: !cmtInput
                                    ? palette.neutral.medium
                                    : palette.primary.main,
                                borderRadius: '3rem',
                            }}
                        >
                            POST
                        </Button>
                    </FlexBetween>
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default Post;
