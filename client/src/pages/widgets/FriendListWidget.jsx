import WidgetWrapper from '../../components/WidgetWrapper';
import Friend from '../../components/Friend';
import { Typography, Box, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFriends } from '../../state/reducer';

const FriendListWidget = ({ userId }) => {
    const { palette } = useTheme();
    const friends = useSelector((state) => state.user.friends);
    const dispatch = useDispatch();
    useEffect(() => {
        const getFriends = async (userId) => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/user/${userId}/friends`
                );
                const friends = await res.json();
                dispatch(setFriends(friends));
            } catch (error) {
                console.log(error);
            }
        };

        getFriends(userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!friends) return null;

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: '1.5rem' }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend, index) => (
                    <Friend
                        key={index}
                        userId={userId}
                        friendId={friend._id}
                        lastName={friend.lastName}
                        firstName={friend.firstName}
                        desc={friend.occupation}
                        imgId={friend.imgId}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
