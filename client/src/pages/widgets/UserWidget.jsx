import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WidgetWrapper from '../../components/WidgetWrapper';
import FlexBetween from '../../components/FlexBetween';
import UserImg from '../../components/UserImg';
import { Typography, Box, useTheme, Divider } from '@mui/material';
import {
    ManageAccountsOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    EditOutlined,
} from '@mui/icons-material';

const UserWidget = ({ userId }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { palette } = useTheme();

    useEffect(() => {
        const getUser = async (id) => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/user/${id}`
                );
                if (res.status >= 200 && res.status <= 299) {
                    const user = await res.json();
                    setUser(user);
                } else {
                    throw 'Get user failed: ' + res.status;
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUser(userId);
    }, []);

    if (!user) return null;

    const { firstName, lastName, location, occupation, friends, picturePath } =
        user;

    return (
        <WidgetWrapper>
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImg img={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={palette.neutral.dark}
                            fontWeight="500"
                            sx={{
                                '&:hover': {
                                    color: palette.primary.light,
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={palette.neutral.medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>
            <Divider />

            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem">
                    <LocationOnOutlined
                        fontSize="large"
                        sx={{ color: palette.neutral.main }}
                    />
                    <Typography color={palette.neutral.medium}>
                        {location}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined
                        fontSize="large"
                        sx={{ color: palette.neutral.main }}
                    />
                    <Typography color={palette.neutral.medium}>
                        {occupation}
                    </Typography>
                </Box>
            </Box>
            <Divider />

            <Box p="1rem 0">
                <Typography
                    fontSize="1rem"
                    color={palette.neutral.main}
                    fontWeight="500"
                    mb="1rem"
                >
                    Social Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/images/twitter.png" alt="twitter" />
                        <Box>
                            <Typography
                                color={palette.neutral.main}
                                fontWeight="500"
                            >
                                Twitter
                            </Typography>
                            <Typography color={palette.neutral.medium}>
                                Social Network
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: palette.neutral.main }} />
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img
                            src="../assets/images/linkedin.png"
                            alt="linkedin"
                        />
                        <Box>
                            <Typography
                                color={palette.neutral.main}
                                fontWeight="500"
                            >
                                Linkedin
                            </Typography>
                            <Typography color={palette.neutral.medium}>
                                Network Platform
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: palette.neutral.main }} />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default UserWidget;
