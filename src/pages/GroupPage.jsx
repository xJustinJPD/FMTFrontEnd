import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/Api";
import UserCard from "../components/UserCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import GroupCard from "@/components/GroupCard";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FriendCard from "@/components/FriendCard";
import { User } from 'lucide-react';

const GroupPage = () => {
            const { group_id } = useParams();
            const [error, setError] = useState(null);
            const [group, setGroup] = useState([]);
            const [local] = axios;
            const [users, setUserList] = useState([]);
            const navigate = useNavigate();
            const [loading, setLoading] = useState(true);
        
            useEffect(() => {
                local.get(`/groups/${group_id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                .then(response => {
                    console.log("RESPONSE", response.data);
                    setGroup(response.data);
                    setUserList(response.data.users);
                    setLoading(false);
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

        const userCards = users.map((user) => (
        <FriendCard key={user.id} user={user} />
        ));

        const handleClick = () => {
            navigate(`/add_user/${group_id}`, { state: { group } });
            console.log("RESPONSE", group_id);
        }

        const handleDelete = () => {
            local.put(`/groups/${group.id}/delete`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then(response => {
                console.log("RESPONSE", response);
                navigate(`/social`)
    
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                }
            });
        }

        if (loading) {
            return (
                <div className="flex justify-center items-center min-h-full w-full bg-secondary">
                    <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin" />
                </div>
            );
        }



    return (
        <div className="flex flex-col w-full min-h-full p-4 space-y-4 bg-secondary relative">
            {/* Group Header */}
            <div className="flex justify-between items-center mb-6">
                {/* Group Title and User Counter */}
                <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold">{group.group_name}</h2>
                    <div className="flex items-center space-x-2 ml-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{group.users ? group.users.length : 0}</span>
                    </div>
                </div>

                {/* Add User Button positioned to the top right */}
                <Button 
                    className="absolute top-4 right-4 primary hover:opacity-80 text-white font-bold py-2 px-4 rounded w-40"
                    onClick={handleClick}
                >
                    Add User
                </Button>
            </div>

            {/* User Counter */}
            <div className="text-lg text-gray-600 mt-6">
                <h3>Members:</h3>
            </div>

            {/* Group Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: User Cards */}
                <div className="flex flex-col space-y-4">
                    {userCards}
                </div>

                {/* Right Column (optional for additional content) */}
                <div className="flex flex-col justify-start">
                    {/* Any additional content for right column */}
                </div>
            </div>

            {/* Delete Button positioned to the bottom right */}
            <Button 
                className="absolute bottom-4 right-4 danger hover:opacity-80 text-white font-bold py-2 px-4 rounded w-40"
                onClick={handleDelete}
            >
                Delete Group
            </Button>
        </div>
    );
    }
    
    export default GroupPage;