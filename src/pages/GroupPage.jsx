import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/Api";
import UserCard from "../components/UserCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import GroupCard from "@/components/GroupCard";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const GroupPage = () => {
            const { group_id } = useParams();
            const [error, setError] = useState(null);
            const [group, setGroup] = useState([]);
            const [local] = axios;
            const [users, setUserList] = useState([]);
            const navigate = useNavigate();
        
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
        <UserCard key={user.id} user={user} />
        ));

        const handleClick = () => {
            navigate(`/add_user/${group_id}`)
            console.log("RESPONSE", group_id);
        }



    return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 bg-secondary">
        <GroupCard key={group.id} group={group} />
        <br/>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Add User</Button>
        <br/>
        {userCards}
    </div>
    );
    }
    
    export default GroupPage;