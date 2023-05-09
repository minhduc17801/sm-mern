import { Box } from '@mui/material';

const UserImg = ({ imgId, size = '60px' }) => {
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                width={size}
                height={size}
                alt="user"
                src={`${import.meta.env.VITE_IMG_URL_PREFIX}${imgId}`}
            />
        </Box>
    );
};

export default UserImg;
