import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

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
    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
