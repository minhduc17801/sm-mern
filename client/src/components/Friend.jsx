import { Box, useTheme, Typography, IconButton } from '@mui/material';
import { PersonRemoveOutlined, PersonAddOutlined } from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import UserImg from './UserImg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../state/reducer';

const Friend = ({ _id, lastName, firstName, desc, picturePath }) => {
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const friends = useSelector((state) => state.user.friends);
    const dispatch = useDispatch();
    const { palette } = useTheme();

    const isFriend = friends.find((friend) => friend._id === _id);

    const handlePatchFriend = async () => {
        try {
            const res = await fetch(
                `http://localhost:3001/user/${userId}/${_id}`,
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
    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImg img={picturePath} size="55px" />
                <Box onClick={() => navigate(`/profile/${_id}`)}>
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
            <IconButton
                onClick={() => handlePatchFriend()}
                sx={{ backgroundColor: palette.primary.light, p: '0.6rem' }}
            >
                {isFriend ? (
                    <PersonRemoveOutlined
                        sx={{ color: palette.primary.dark }}
                    />
                ) : (
                    <PersonAddOutlined sx={{ color: palette.primary.dark }} />
                )}
            </IconButton>
        </FlexBetween>
    );
};

export default Friend;
