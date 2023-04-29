import { useMediaQuery, Box } from '@mui/material';
import Navbar from '../Navbar';
import UserWidget from '../widgets/UserWidget';
import FriendListWidget from '../widgets/FriendListWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from '../widgets/PostsWidget';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const isNonMobile = useMediaQuery('(min-width: 768px)');
    const { userId } = useParams();

    useEffect(() => {
        const getUser = async (userId) => {
            try {
                const res = await fetch(`http://localhost:3001/user/${userId}`);
                const user = await res.json();
                setUser(user);
            } catch (error) {
                console.log(error);
            }
        };

        getUser(userId);
    }, []);

    if (!user) return null;
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobile ? 'flex' : 'block'}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobile ? '26%' : undefined}>
                    <UserWidget
                        userId={userId}
                        picturePath={user.picturePath}
                    />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobile ? '42%' : undefined}
                    mt={isNonMobile ? undefined : '2rem'}
                >
                    <MyPostWidget picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    );
}

export default ProfilePage;
