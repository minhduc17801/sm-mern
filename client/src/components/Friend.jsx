import { Box, useTheme, Typography, IconButton } from '@mui/material';
import { PersonRemoveOutlined, PersonAddOutlined } from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import UserImg from './UserImg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../state/reducer';

const Friend = ({ friendId, lastName, firstName, desc, picturePath }) => {
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const friends = useSelector((state) => state.user.friends);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const isMe = friendId === userId;

    const isFriend = friends.find((friend) => friend._id === friendId);

    const handlePatchFriend = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/user/${userId}/${friendId}`,
                {
                    method: 'PATCH',
                    headers: {
                        authorization: 'Bearer ' + token,
                    },
                }
            );

            const friends = await res.json();
            dispatch(setFriends(friends));
        } catch (error) {}
    };

    let FriendIcon = isFriend ? (
        <IconButton
            onClick={() => handlePatchFriend()}
            sx={{ backgroundColor: palette.primary.light, p: '0.6rem' }}
        >
            <PersonRemoveOutlined sx={{ color: palette.primary.dark }} />
        </IconButton>
    ) : (
        <IconButton
            onClick={() => handlePatchFriend()}
            sx={{ backgroundColor: palette.primary.light, p: '0.6rem' }}
        >
            <PersonAddOutlined sx={{ color: palette.primary.dark }} />
        </IconButton>
    );

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImg img={picturePath} size="55px" />
                <Box onClick={() => navigate(`/profile/${friendId}`)}>
                    <Typography
                        color={palette.neutral.main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            '&:hover': {
                                color: palette.primary.light,
                                cursor: 'pointer',
                            },
                        }}
                    >
                        {firstName + ' ' + lastName}
                    </Typography>
                    <Typography
                        color={palette.neutral.medium}
                        fontSize="0.75rem"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        maxWidth="100%"
                    >
                        {desc}
                    </Typography>
                </Box>
            </FlexBetween>
            {!isMe && FriendIcon}
        </FlexBetween>
    );
};

export default Friend;
