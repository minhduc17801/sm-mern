import { Typography, useTheme } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';
import WidgetWrapper from '../../components/WidgetWrapper';
import ads from '../../assets/ads.jpeg';

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src={ads}
                style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
            />
            <FlexBetween>
                <Typography color={main}>Mongodb</Typography>
                <Typography color={medium}>mongodb.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                MongoDB is an open-source NoSQL database system designed to
                store and process highly flexible JSON documents.
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;
