import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()
    const { authenticated } = useAuth();

    return (
    <>
        {(!authenticated) ? (
        <LoginForm />
        ) : (
        navigate('/')
        )}
        
    </>
    );
    }
    
    export default LoginPage;