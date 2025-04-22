import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function LogoutButton() {
    const navigate = useNavigate();
    const { logout } = useAuth();


    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;