import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.token);
    if (!token) return <Navigate to="/" />;
    return children;
};

export default ProtectedRoute;
