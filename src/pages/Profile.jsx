import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/Api";
import UserCard from "../components/UserCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import GroupCard from "@/components/GroupCard";
import { Button } from "@/components/ui/button";

const UserPage = () => {
            const [error, setError] = useState(null);
            const [local] = axios;
            const [user, setUser] = useState([]);
        
            useEffect(() => {
                local.get(`/profile`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                .then(response => {
                    console.log("RESPONSE", response.data);
                    setUser(response.data);
                })
                .catch(err => {
                    console.error(err);
                    if (err.response && err.response.data && err.response.data.message) {
                        setError(err.response.data.message);
                    }
                });
            }, [local]);
        

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
        <UserCard key={user.id} user={user} />
    </>
    );
    }
    
    export default UserPage;