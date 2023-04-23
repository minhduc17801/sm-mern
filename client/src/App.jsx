import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
    {
        path: '/profile/:userId',
        element: <ProfilePage />,
    },
]);

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
                <RouterProvider router={router} />
            </div>
        </ThemeProvider>
    );
}

export default App;
