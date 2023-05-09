import FlexBetween from '../../components/FlexBetween';
import WidgetWrapper from '../../components/WidgetWrapper';
import UserImg from '../../components/UserImg';
import {
    Box,
    InputBase,
    useTheme,
    IconButton,
    Typography,
    Divider,
    useMediaQuery,
} from '@mui/material';
import {
    DeleteOutlined,
    EditOutlined,
    ImageOutlined,
    GifBoxOutlined,
    AttachFileOutlined,
    MicOutlined,
    CloseOutlined,
    MoreHorizOutlined,
} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state/reducer';

const MyPostWidget = ({ imgId }) => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery('(min-width: 768px)');

    const handlePost = async () => {
        setLoading(true);
        try {
            const form = new FormData();
            form.append('userId', _id);
            form.append('description', input);
            if (image) {
                form.append('image', image);
            }
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/post/create`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: form,
                }
            );
            if (res.status >= 400) return;
            const posts = await res.json();
            dispatch(setPosts(posts));
            setInput('');
            setImage(null);
            setIsImage(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <WidgetWrapper mb="2rem">
            <FlexBetween gap="1.5rem">
                <UserImg imgId={imgId} />
                <InputBase
                    placeholder="What's on your mind..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    sx={{
                        width: '100%',
                        backgroundColor: palette.neutral.light,
                        borderRadius: '2rem',
                        padding: '1rem 2rem',
                    }}
                />
            </FlexBetween>

            {isImage && (
                <Box
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        accept={{
                            'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
                        }}
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ '&:hover': { cursor: 'pointer' } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>
                                                {image.name}
                                            </Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image ? (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: '15%' }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        onClick={() => setIsImage(false)}
                                        sx={{ width: '15%' }}
                                    >
                                        <CloseOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: '1.25rem 0' }} />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: palette.neutral.mediumMain }} />
                    <Typography
                        color={palette.neutral.mediumMain}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                                color: palette.neutral.medium,
                            },
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobile ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined
                                sx={{ color: palette.neutral.mediumMain }}
                            />
                            <Typography color={palette.neutral.mediumMain}>
                                Clip
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined
                                sx={{ color: palette.neutral.mediumMain }}
                            />
                            <Typography color={palette.neutral.mediumMain}>
                                Attachment
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined
                                sx={{ color: palette.neutral.mediumMain }}
                            />
                            <Typography color={palette.neutral.mediumMain}>
                                Audio
                            </Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined
                            sx={{ color: palette.neutral.mediumMain }}
                        />
                    </FlexBetween>
                )}

                <LoadingButton
                    loading={loading}
                    disabled={(!input && !image) || loading}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor:
                            (!input && !image) || loading
                                ? palette.neutral.medium
                                : palette.primary.main,
                        borderRadius: '3rem',
                    }}
                >
                    POST
                </LoadingButton>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;
