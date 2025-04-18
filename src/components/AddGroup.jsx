import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import axios from '../config/Api';
import { useState } from 'react';


const AddGroupCard = () => {
    const [local] = axios;
    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        group_name: ""
    });

    const [errorMessage, setErrorMessage] = useState("");



    const handleClick = () => {
        local.post('/groups', {
            group_name: form.group_name
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log(response);
            window.location.reload(); 
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
        <>
            <div className='grid grid-cols-1 gap-1 justify-items-center m-3'>
            <h2 className='m-3'><b>Create New Group:</b></h2>
            Group Name: <input onChange={handleForm} onKeyDown={handleKeyDown} type="text" className='border' name="group_name" value={form.group_name}  />

            <button className='btn btn-primary w-20' onClick={handleClick}>Create New Group</button>
            <p style={errorStyle}>{errorMessage}</p>
            </div>
        </>
    );
};

export default AddGroupCard;