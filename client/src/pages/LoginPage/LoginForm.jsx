import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    TextField,
    Box,
    useMediaQuery,
    useTheme,
    Typography,
    Modal,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../../state/reducer';

const validationSchema = yup.object({
    email: yup.string().trim().email().required(),
    password: yup.string().trim().min(5).required(),
});

const initialValues = {
    email: '',
    password: '',
};

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [openLoginModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const handleSubmit = async (values, formikBag) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                }
            );
            formikBag.resetForm();
            if (res.status !== 200) return handleOpenModal();
            const data = await res.json();
            if (data) {
                dispatch(setLogin(data));
                navigate('/home');
            }
        } catch (error) {
            handleOpenModal();
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

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
                    <LoadingButton
                        loading={loading}
                        fullWidth
                        type="submit"
                        sx={{
                            m: '2rem 0',
                            p: '1rem',
                            backgroundColor: loading
                                ? palette.neutral.medium
                                : palette.primary.main,
                            color: palette.background.alt,
                            '&:hover': { color: palette.primary.main },
                        }}
                    >
                        LOGIN
                    </LoadingButton>
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
                            Login failed!!!
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>
    );
};

export default LoginForm;
