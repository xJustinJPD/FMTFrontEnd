import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";

function LogoutButton() {
    const navigate = useNavigate();
    const { logout } = useAuth();


    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <Button className="extra" onClick={handleLogout}>Logout</Button>
    );
}

export default LogoutButton;