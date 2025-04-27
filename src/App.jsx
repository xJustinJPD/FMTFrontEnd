import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"

// Routes
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import SocialPage from "./pages/Social";
import GroupPage from "./pages/GroupPage";
import AddUserPage from "./pages/AddUsersPage";
import FirstTimeLoginForm from "./components/FirstTimeLoginForm";
import Navbar from "./components/Navbar";
import GroupNotificationWatcher from "./contexts/GroupWatcher";
import UserPage from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import WelcomePage from "./pages/WelcomePage";



import { useAuth } from "./contexts/AuthContext";
import PageNotFoundPage from "./pages/PageNotFound";
import HelpPage from "./pages/HelpPage";

    function App() {
    const { authenticated, onAuthenticated } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    let protectedRoutes;

    useEffect(() => {
        if(localStorage.getItem('token')){
        onAuthenticated(true);
        }
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);

    const clearError = () => {
        setError(null);
    };

  // Set up interval to clear error every 3 seconds
    useEffect(() => {
        let errors;

    if (error) {
        errors = setInterval(() => {
            clearError();
        }, 4000);
    }

    // Clean up interval on component unmount or when error is cleared
    return () => clearInterval(errors);
    }, [error]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full">
            <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin" />
            </div>
        );
    }

    if(authenticated){
            protectedRoutes = (
            <>
            <Route path='/social' element={
                <PrivateRoute>
                    <SocialPage/>
                </PrivateRoute>
                }/>
            <Route path='/groups/:group_id' element={
                <PrivateRoute>
                    <GroupPage/>
                </PrivateRoute>
                }/>
            <Route path='/add_user/:group_id' element={
                <PrivateRoute>
                    <AddUserPage/>
                </PrivateRoute>
                }/>
            <Route path='/profile' element={
                <PrivateRoute>
                    <UserPage/>
                </PrivateRoute>
                }/>
            <Route path="/home" element={
                <PrivateRoute>
                    <MainPage/>
                </PrivateRoute>
                }/>
                <Route path="/help" element={
                <PrivateRoute>
                    <HelpPage/>
                </PrivateRoute>
                }/>
            </>
            );
    }
    return (
        <Router>
            <GroupNotificationWatcher />
            <LocationAwareLayout />
            <Toaster position="top-center" toastOptions={{ className: 'sonner-toast', duration: 4000 }} />
            <Routes>
                {protectedRoutes}
                <Route path='/' element={<WelcomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/firstlogin' element={<FirstTimeLoginForm />} />
                <Route path ='*' element={<PageNotFoundPage />} />
            </Routes>
        </Router>
    );
}

function LocationAwareLayout() {
    const location = useLocation();
    const hideSidebar = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/firstlogin' || location.pathname === '/';

    return (
        <>
            { !hideSidebar && <Navbar /> }
        </>
    );
}

export default App;