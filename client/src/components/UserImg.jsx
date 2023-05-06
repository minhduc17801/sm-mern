import { Box } from '@mui/material';

const UserImg = ({ img, size = '60px' }) => {
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                width={size}
                height={size}
                alt="user"
                src={`${import.meta.env.VITE_API_URL}/assets/${img}`}
            />
        </Box>
    );
};

export default UserImg;
