import { styled } from '@mui/system';
import { Box } from '@mui/material';

const WidgetWrapper = styled(Box)(({ theme, bgcl }) => ({
    padding: '1.5rem 1.5rem 0.75rem 1.5rem',
    backgroundColor: bgcl ? bgcl : theme.palette.background.alt,
    borderRadius: '0.75rem',
}));

export default WidgetWrapper;
