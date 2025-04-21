import axios from '../config/Api';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';


const FirstTimeLoginForm = () => {
    const [local] = axios;
    const { onAuthenticated } = useAuth();
    const errorStyle = {
        color: 'red'
    };
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleDiscord = (token) => {
        window.location.href = `http://localhost:5000/discord_login?token=${token}`;
    }

    const handleClick = () => {
        // let regToken = localStorage.getItem('token');

        local.post('/login', {
            email: form.email,
            password: form.password
        })
        .then(response => {
            console.log(response);
            const  token  = response.data.access_token;
            onAuthenticated(true, token);
            handleDiscord(response.data.access_token);
        })
        .catch(err => {
            console.error(err);
            setErrorMessage(err.response.message);
        });
    }        

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    };

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

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

    return (
        <>
            <div className='grid grid-cols-1 gap-1 justify-items-center m-3'>
            <h2 className='m-3'><b>Login:</b></h2>
            Email: <input onChange={handleForm} onKeyDown={handleKeyDown} type="text" className='border' name="email" value={form.email}  /> <br />
            Password: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border'  type="password" name="password" value={form.password} />
            {/* <p className="py-6">or <b><Link to={`/register`}>Register</Link></b></p> */}

            <button className='btn btn-primary w-20' onClick={handleClick}>Login</button>
            <p style={errorStyle}>{errorMessage}</p>
            </div>
        </>
    );
};

export default FirstTimeLoginForm;