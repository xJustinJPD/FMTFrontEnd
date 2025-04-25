import axios from '../config/Api';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


const LoginForm = () => {
    const [local] = axios;
    const { onAuthenticated } = useAuth();
    const navigate = useNavigate();
    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

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
            navigate('/home');
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

    return (
            <div className="flex flex-col items-center justify-center min-h-screen w-full bg-muted px-4 space-y-4">
            <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle className="text-center text-3xl font-bold">
                Welcome to FindMyTeam
                </CardTitle>
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
                />
                </div>
                <Button className="w-full" onClick={handleClick}>
                Login
                </Button>
                {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
            </CardContent>
            </Card>
    
            {/* Register Prompt Below Card */}
            <div className="text-center space-y-2">
            <p className="text-sm">Don't have an account?</p>
            <Button asChild variant={"outline"}>
                <Link to="/register">Register</Link>
            </Button>
            </div>
        </div>
    );
};

export default LoginForm;