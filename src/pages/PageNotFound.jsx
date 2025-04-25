import LoginForm from "../components/LoginForm";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const PageNotFoundPage = () => {

    return (
    <>
            <div className="flex flex-col items-center justify-center h-screen gap-6 text-center w-full">
            <h1 className="text-4xl font-bold">404s and heartbreaks</h1>
            <h2 className="m-1">The page you are looking for does not exist.</h2>
            <p className="m-1">Please check the URL or return to the home page.</p>
            <div className="flex gap-4">
                <Button asChild>
                <Link to="/">Home</Link>
                </Button>
            </div>
            </div>
    </>
    );
    }
    
    export default PageNotFoundPage;