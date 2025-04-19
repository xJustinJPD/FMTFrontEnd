import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/Api";
import UserCard from "../components/UserCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import GroupCard from "@/components/GroupCard";
import { useParams } from "react-router-dom";
import MatchCard from "@/components/MatchCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
            const { group_id } = useParams();
            const [error, setError] = useState(null);
            const [local] = axios;
            const [users, setUserList] = useState([]);
            const navigate = useNavigate();
        
            useEffect(() => {
                local.get(`/likes`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                .then(response => {
                    console.log("RESPONSE", response.data);
                    setUserList(response.data);
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

        const handleClick = (id) => () => {
            local.post(`/add_user_to_group`,{
                group_id: group_id,
                user_id: id
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then(response => {
                console.log("RESPONSE", response.data);
                navigate(`/groups/${group_id}`)
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                }
            });
        }


    return (
    <>
                <div className="flex justify-center items-center min-h-screen p-4">
                <h2 className="text-lg font-semibold mb-4">People You've Liked:</h2>
                {users.length === 0 ? (
                    <p>No likes sent yet!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map((user) => (
                            <div key={user.liked_id}>
                                <MatchCard user={user.liked} />
                                <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick(user.id)}>Add User</Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
    </>
    );
    }
    
    export default AddUserPage;