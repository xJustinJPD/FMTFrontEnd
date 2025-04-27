import axios from '../config/Api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import riotlogo from '../assets/riot-games-seeklogo.png';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"


const RegisterForm = () => {
    const [local] = axios;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        email: "",
        password: "",
        username : "",
        first_name : "",
        last_name : "",
        role: "",
        bio: "",
        riot_name:"",
        riot_tag:"",
        riot_region:"",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleClick = () => {
        setLoading(true);
        // let regToken = localStorage.getItem('token');

        local.post('/register', {
            email: form.email,
            password: form.password,
            username : form.username,
            first_name : form.first_name,
            last_name : form.last_name,
            role: form.role,
            bio: form.bio,
            riot_name: form.riot_name,
            riot_tag: form.riot_tag,
            riot_region: form.riot_region
        })
        .then(response => {
            console.log(response);
            navigate('/firstlogin', {state: { email: form.email, password: form.password }});
        })
        .catch(err => {
            console.error(err);
            setErrorMessage(err.response.message);
        })
        .finally(() => {
            setLoading(false);
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
            <div className="flex items-center justify-center min-h-screen bg-muted px-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Left Card: General Information */}
            <Card className="shadow-lg">
                <CardHeader>
                <CardTitle className="text-left text-3xl font-bold">Register</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                {[
                    { id: "email", label: "Email", type: "text" },
                    { id: "password", label: "Password", type: "password" },
                    { id: "username", label: "Username", type: "text" },
                    { id: "first_name", label: "First Name", type: "text" },
                    { id: "last_name", label: "Last Name", type: "text" },
                    { id: "role", label: "Role", type: "select" , options: ["Top", "Jungle", "Mid", "ADC", "Support"] },
                    { id: "bio", label: "Bio", type: "text" },
                ].map(({ id, label, type, options }) => (
                    <div key={id} className="space-y-2">
                    <Label htmlFor={id}>{label}</Label>
                    {type === "select" ? (
                    <Select
                    value={form[id]}
                    onValueChange={(value) => handleForm({ target: { name: id, value } })}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                        {option}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            ) : (
                <Input
                    id={id}
                    type={type}
                    name={id}
                    value={form[id]}
                    onChange={handleForm}
                    onKeyDown={handleKeyDown}
                />
            )}
                    </div>
                ))}

                {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
                </CardContent>
            </Card>
            <div className="space-y-4">
    
            {/* Right Card: Riot Info */}
            <Card className="shadow-lg bg-red-50 h-2/3">
                <CardHeader>
                <img src={riotlogo} alt="Riot Games Logo" className="w-24 h-auto mb-4" />
                </CardHeader>
                <CardContent className="space-y-4">
                <CardDescription>Input your RIOT information here so we can retrieve your statistics</CardDescription>
                </CardContent>
                <CardContent className="space-y-4">
                {[
                    { id: "riot_name", label: "RIOT Name", type: "text" },
                    { id: "riot_tag", label: "RIOT Tag", type: "text", prefix: "#" },
                    { id: "riot_region", label: "Region", type: "text" },
                ].map(({ id, label, type, prefix }) => (
                    <div key={id} className="space-y-2">
                    <Label htmlFor={id}>{label}</Label>
                    <div className="flex items-center">
                        {prefix && <span className="mr-1 text-lg font-semibold text-gray-600">{prefix}</span>}
                        <Input
                        id={id}
                        type={type}
                        name={id}
                        value={form[id]}
                        onChange={handleForm}
                        onKeyDown={handleKeyDown}
                        />
                    </div>
                    </div>
                ))}
                </CardContent>
            </Card>
            <Button className="w-full" onClick={handleClick} disabled={loading}>    {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Registering...
                </div>
            ) : (
                "Register"
            )}</Button>
            </div>
            </div>
        </div>
    );
};

export default RegisterForm;