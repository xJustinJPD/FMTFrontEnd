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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "react-router-dom";


const AddUserPage = () => {
            const { group_id } = useParams();
            const [error, setError] = useState(null);
            const [local] = axios;
            const [users, setUserList] = useState([]);
            const navigate = useNavigate();
            const location = useLocation();
            const { group } = location.state || {}; // Get the group from the location state
        
            useEffect(() => {
                local.get(`/friends`,{
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

        const isUserInGroup = (userId) => {
            return group.users.some(user => user.id === userId); // Check if user is already in the group
        };



    return (
    <>
                <div className="flex justify-center items-center min-h-screen p-4 w-full bg-secondary">
                    
                <Card className="bg-muted h-[400px] border-none w-200">
                        <CardHeader className="flex items-center justify-between pl-4">
                            <CardTitle className="text-md">Add Friends:</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[320px] px-4 py-2">
                                {users.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No friends yet!</p>
                                ) : (
                                    users.map(friendMatch => {
                                        const { liker, liked, current_user_id } = friendMatch;
                                        const friend = liker.id === current_user_id ? liked : liker;
                                        return (
                                            <div key={friend.id} className="flex justify-between items-center py-2 border-b border-muted-foreground">
                                                <span className="text-sm font-medium">{friend.username}</span>
                                                <Button className="primary hover:opacity-80 transition text-white font-bold py-2 px-4 rounded" onClick={handleClick(friend.id)} disabled={isUserInGroup(friend.id)}>{isUserInGroup(friend.id) ? 'Added' : 'Add'}</Button>
                                            </div>
                                        );
                                    })
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>
            </div>
    </>
    );
    }
    
    export default AddUserPage;