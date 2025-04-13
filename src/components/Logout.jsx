import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the JWT token from localStorage (or sessionStorage, cookies, etc.)
        localStorage.removeItem('token');

        // Optionally clear other user-related data (like user info)
        // localStorage.removeItem('user'); 

        // Redirect to the login page or any page you prefer
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;