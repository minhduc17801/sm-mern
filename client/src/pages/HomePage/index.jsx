import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import UserWidget from '../widgets/UserWidget';
import AdvertWidget from '../widgets/AdvertWidget';
import FriendListWidget from '../widgets/FriendListWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from '../widgets/PostsWidget';

function HomePage() {
    const isNonMobile = useMediaQuery('(min-width: 900px)');
    const { _id, imgId } = useSelector((state) => state.user);
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobile ? 'flex' : 'block'}
                gap="0.5rem"
                justifyContent="space-between"
            >
                {isNonMobile && (
                    <Box flexBasis="26%">
                        <UserWidget userId={_id} />
                    </Box>
                )}
                <Box
                    flexBasis={isNonMobile ? '42%' : undefined}
                    mt={isNonMobile ? undefined : '2rem'}
                >
                    <MyPostWidget imgId={imgId} />
                    <PostsWidget userId={_id} />
                </Box>
                {isNonMobile && (
                    <Box flexBasis="26%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                        <FriendListWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default HomePage;
