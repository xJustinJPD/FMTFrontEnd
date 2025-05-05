import axios from '../config/Api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import { useLocation } from 'react-router-dom';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"




const UpdatePage = () => {
    const location = useLocation();
    const { username, bio, role } = location.state || { };
    const [local] = axios;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: username || "",
        bio: bio || "",
        role: role || ""
    });

    const handleClick = () => {


        local.put('/profile/update', {
            username: form.username,
            bio: form.bio,
            role: form.role,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            console.log(response);
            navigate('/profile');
        })
        .catch(err => {
            console.error(err);
            toast.error(
                err?.response?.data?.message || "An unexpected error occurred."
            );
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
            <div className="flex flex-col items-center justify-center min-h-screen w-300 bg-muted px-4 space-y-4">
            <Card className="shadow-lg w-100">
                <CardHeader>
                <CardTitle className="text-left text-3xl font-bold">Edit Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 items-center justify-center">
                {[
                    { id: "username", label: "Username", type: "text" },
                    { id: "role", label: "Role", type: "select" , options: ["Top", "Jungle", "Mid", "ADC", "Support"] },
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
                <Button onClick={handleClick} className="w-full bg-primary text-white hover:opacity-80">Update</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdatePage;