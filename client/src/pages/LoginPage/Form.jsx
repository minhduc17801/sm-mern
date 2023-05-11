import { useTheme, Typography } from '@mui/material';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Form = () => {
    const [pageType, setPageType] = useState('login');
    const { palette } = useTheme();

    return (
        <>
            {pageType === 'login' ? (
                <LoginForm />
            ) : (
                <RegisterForm setPageType={setPageType} />
            )}
            <Typography
                onClick={() => {
                    setPageType(pageType === 'login' ? 'register' : 'login');
                }}
                sx={{
                    textDecoration: 'underline',
                    color: palette.primary.main,
                    '&:hover': {
                        cursor: 'pointer',
                        color: palette.primary.light,
                    },
                }}
            >
                {pageType === 'login'
                    ? "Don't have an account? Sign Up here."
                    : 'Already have an account? Login here.'}
            </Typography>
        </>
    );
};

export default Form;
