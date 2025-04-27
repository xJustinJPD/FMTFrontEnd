import axios from '../config/Api';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLocation } from 'react-router-dom';


const FirstTimeLoginForm = () => {
    const location = useLocation();
    const { email, password } = location.state || { };
    const [local] = axios;
    const { onAuthenticated } = useAuth();
    const errorStyle = {
        color: 'red'
    };
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        email: email || "",
        password: password || ""
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
            setErrorMessage(err.response.msg);
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
        <div className="flex items-center justify-center min-h-screen w-full bg-muted px-4">
        <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">
            Welcome to FindMyTeam
            </CardTitle>
            <p className="mt-2 mb-4 text-muted-foreground text-center">Once you log in you will be redirected to connect your discord information</p>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="text"
                name="email"
                value={form.email}
                onChange={handleForm}
                onKeyDown={handleKeyDown}
                placeholder="you@example.com"
                disabled={!!email} // Disable if email is provided in state
            />
            </div>
            <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleForm}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                disabled={!!password} // Disable if password is provided in state
            />
            </div>
            <Button className="w-full extra" onClick={handleClick}>
            Login
            </Button>
            {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        </CardContent>
        </Card>
    </div>
    );
};

export default FirstTimeLoginForm;