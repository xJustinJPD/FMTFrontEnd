import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/Api";


function MainPage() {
    const [error, setError] = useState(null);
    const [profiles, setProfileList] = useState([]);
    const [local] = axios;
    const [filters] = useState({
        "role" : "Controller"
    });

    useEffect(() => {
        local.post("/users", filters,{
            headers: {
    
            }
        })
        .then(response => {
            setProfileList(response.data);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        });
    }, [filters, local]);


    console.log(profiles);
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
        <div>
            <h1>Profiles</h1>
            <p>{profiles[0]?.username|| "Loading..."}</p>
            <p>{profiles[0]?.role || "Loading..."}</p>
            <p>{profiles[0]?.bio || "Loading..."}</p>
            </div>
    );
}

export default MainPage;