import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    TextField,
    Button,
    Box,
    useMediaQuery,
    useTheme,
    Typography,
    Modal,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FlexBetween from '../../components/FlexBetween';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

const validationSchema = yup.object({
    firstName: yup.string().trim().required(),
    lastName: yup.string().trim().required(),
    email: yup.string().trim().email().required(),
    password: yup.string().min(5).trim().required(),
    location: yup.string().trim().required(),
    occupation: yup.string().trim().required(),
    picture: yup.mixed().required(),
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
};

const RegisterForm = ({ setPageType }) => {
    const [openLoginModal, setOpenModal] = useState(false);
    const [msg, setMsg] = useState('');
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const handleSubmit = async (values) => {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }

        const res = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            body: formData,
        });

        if (res.status >= 200 && res.status <= 299) {
            setMsg('Successful registration');
        } else {
            setMsg('Failed registration');
        }

        handleOpenModal();
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    // Ngăn input bắt đầu bằng khoảng trắng
    const customHandleChange = (e) => {
        if (!e.target.value.startsWith(' ')) {
            formik.handleChange(e);
        }
    };

    // Không cho phép nhập khoảng trắng
    const customHandleChangeForPwdEmail = (e) => {
        e.target.value = e.target.value.trim();
        formik.handleChange(e);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        '& > div': {
                            gridColumn: isNonMobile ? undefined : 'span 4',
                        },
                    }}
                >
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        onBlur={formik.handleBlur}
                        onChange={customHandleChange}
                        value={formik.values.firstName}
                        error={
                            formik.touched.firstName &&
                            Boolean(formik.errors.firstName)
                        }
                        helperText={
                            formik.touched.firstName && formik.errors.firstName
                        }
                        sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        onBlur={formik.handleBlur}
                        onChange={customHandleChange}
                        value={formik.values.lastName}
                        error={
                            formik.touched.lastName &&
                            Boolean(formik.errors.lastName)
                        }
                        helperText={
                            formik.touched.lastName && formik.errors.lastName
                        }
                        sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField
                        id="location"
                        name="location"
                        label="Location"
                        onBlur={formik.handleBlur}
                        onChange={customHandleChange}
                        value={formik.values.location}
                        error={
                            formik.touched.location &&
                            Boolean(formik.errors.location)
                        }
                        helperText={
                            formik.touched.location && formik.errors.location
                        }
                        sx={{ gridColumn: 'span 4' }}
                    />
                    <TextField
                        id="occupation"
                        name="occupation"
                        label="Occupation"
                        onBlur={formik.handleBlur}
                        onChange={customHandleChange}
                        value={formik.values.occupation}
                        error={
                            formik.touched.occupation &&
                            Boolean(formik.errors.occupation)
                        }
                        helperText={
                            formik.touched.occupation &&
                            formik.errors.occupation
                        }
                        sx={{ gridColumn: 'span 4' }}
                    />
                    <Box
                        gridColumn="span 4"
                        border={`1px solid ${palette.neutral.medium}`}
                        borderRadius="5px"
                        p="1rem"
                    >
                        <Dropzone
                            accept={{
                                'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
                            }}
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                                formik.setFieldValue(
                                    'picture',
                                    acceptedFiles[0]
                                )
                            }
                        >
                            {({ getRootProps, getInputProps }) => (
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    sx={{
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {!formik.values.picture ? (
                                        <p>Add Picture Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>
                                                {formik.values.picture.name}
                                            </Typography>
                                            <EditOutlinedIcon />
                                        </FlexBetween>
                                    )}
                                </Box>
                            )}
                        </Dropzone>
                    </Box>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        onBlur={formik.handleBlur}
                        onChange={customHandleChangeForPwdEmail}
                        value={formik.values.email}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{ gridColumn: 'span 4' }}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        onBlur={formik.handleBlur}
                        onChange={customHandleChangeForPwdEmail}
                        value={formik.values.password}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                        sx={{ gridColumn: 'span 4' }}
                    />
                </Box>
                <Box>
                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m: '2rem 0',
                            p: '1rem',
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            '&:hover': { color: palette.primary.main },
                        }}
                    >
                        REGISTER
                    </Button>
                </Box>
            </form>
            <div>
                <Modal open={openLoginModal} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            height: 200,
                            border: '2px solid',
                            backgroundColor: palette.background.default,
                            borderColor: palette.primary.main,
                            borderRadius: '5px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h3"
                            component="h2"
                            color={palette.primary.main}
                        >
                            {msg}
                        </Typography>
                        {msg === 'Successful registration' && (
                            <Button
                                width="50%"
                                type="submit"
                                sx={{
                                    m: '2rem 0',
                                    p: '1rem',
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    '&:hover': { color: palette.primary.main },
                                }}
                                onClick={() => setPageType('login')}
                            >
                                Go to login
                            </Button>
                        )}
                    </Box>
                </Modal>
            </div>
        </>
    );
};
export default RegisterForm;
