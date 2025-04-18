import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";

// Routes
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import SocialPage from "./pages/Social";



// import { useAuth } from './contexts/AuthContexts';
    function App() {
    // const { authenticated, onAuthenticated } = useAuth();
    const [error, setError] = useState(null);


    // let protectedRoutes;

    // useEffect(() => {
    //     if(localStorage.getItem('token')){
    //     onAuthenticated(true);
    //     }
    // }, []);

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

    // if(authenticated){
    //     // protectedRoutes = (
    //     // <>

    //     // </>
    //     // );
    // }

    return (
        <Router>
        {/* <Navbar/> */}
        <Routes>
        {/* {protectedRoutes} */}
        <Route path='/' element={<MainPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/social' element={<SocialPage/>}/>
        </Routes>
        {/* <Footer/> */}
    </Router>
    );
}

export default App;