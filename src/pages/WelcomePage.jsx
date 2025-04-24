import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const WelcomePage = () => {
    const { authenticated } = useAuth();

    return (
    <>
        {(!authenticated) ? (
            <div className="flex flex-col items-center justify-center h-screen gap-6 text-center w-full">
            <h1 className="text-4xl font-bold">Welcome to FindMyTeam</h1>
            <div className="flex gap-4">
                <Button asChild>
                <Link to="/login">Login</Link>
                </Button>
                <Button variant="outline" asChild>
                <Link to="/register">Register</Link>
                </Button>
            </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-screen gap-6 text-center w-full">
            <h1 className="text-4xl font-bold">Welcome back!</h1>
            <div className="flex gap-4">
                <Button asChild>
                <Link to="/home">Home</Link>
                </Button>
                <Button variant="outline" asChild>
                <Link to="/logout">Logout</Link>
                </Button>
            </div>
            </div>
        )}
    </>
    );
    }
    
    export default WelcomePage;