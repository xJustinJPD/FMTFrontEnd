import axios from '../config/Api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const [local] = axios;
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
            navigate('/firstlogin');
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
            <h2 className='m-3'><b>Register:</b></h2>
            Email: <input onChange={handleForm} onKeyDown={handleKeyDown} type="text" className='border' name="email" value={form.email}  /> <br />
            Password: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border'  type="password" name="password" value={form.password} />
            Username: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border'  type="text" name="username" value={form.username} /> <br />
            First Name: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border'  type="text" name="first_name" value={form.first_name} /> <br />
            Last Name: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border'  type="text" name="last_name" value={form.last_name} /> <br />
            Role: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border'  type="text" name="role" value={form.role} /> <br />
            Bio: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border'  type="text" name="bio" value={form.bio} /> <br />
            Riot Name: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border'  type="text" name="riot_name" value={form.riot_name} /> <br />
            Riot Tag: #<input onChange={handleForm} onKeyDown={handleKeyDown} className='border'  type="text" name="riot_tag" value={form.riot_tag} /> <br />
            Riot Region: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border'  type="text" name="riot_region" value={form.riot_region} /> <br />
            {/* <p className="py-6">or <b><Link to={`/register`}>Register</Link></b></p> */}

            <button className='btn btn-primary w-20' onClick={handleClick}>Register</button>
            <p style={errorStyle}>{errorMessage}</p>
            </div>
        </>
    );
};

export default RegisterForm;