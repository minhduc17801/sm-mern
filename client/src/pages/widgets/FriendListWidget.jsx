import WidgetWrapper from '../../components/WidgetWrapper';
import Friend from '../../components/Friend';
import { Typography, Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
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
                    `http://localhost:3001/user/${userId}/friends`
                );
                const friends = await res.json();
                dispatch(setFriends(friends));
            } catch (error) {
                console.log(error);
            }
        };

        getFriends(userId);
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
                        {...friend}
                        // friendId={friend._id}
                        // name={`${friend.firstName} ${friend.lastName}`}
                        // subtitle={friend.occupation}
                        // userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
