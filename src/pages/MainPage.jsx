import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/Api";
import UserCard from "../components/UserCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import FiltersDropdown from "@/components/Filters";
import MatchCard from "@/components/MatchCard";
import LogoutButton from "@/components/Logout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecievedCard from "@/components/RecievedCard";





function MainPage() {
    const [error, setError] = useState(null);
    const [users, setUserList] = useState([]);
    const [likes, setLikesList] = useState([]);
    const [likedMe, setLikedMeList] = useState([]);
    const [local] = axios;
    const [filters, setFilters] = useState({
    });

    const fetchUsers = () => {
        local.post("/users", filters, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            setUserList(response.data);
        })
        .catch((err) => {
            console.error(err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            }
        });
    };

    useEffect(() => {
        fetchUsers();
    }, [filters]);

    const fetchLikes = () => {
        local.get("/likes", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            setLikesList(response.data);
        })
        .catch(err => {
            console.error(err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            }
        });
    };

    useEffect(() => {
        fetchLikes();
    }, []);

    useEffect(() => {
        local.get("/liked_me",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            console.log("LIKES RESPONSE", response.data);

            setLikedMeList(response.data);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        });
    }, []);


    console.log("response",users);
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

    // const userCards = users.map((user) => (
    //     <UserCard key={user.id} user={user} />
    // ));
    
    const handleLike = () => {
        fetchLikes();
        fetchUsers();
    }


    return (
        <div className="w-full min-h-screen bg-secondary overflow-x-hidden">
        <div className="flex flex-col xl:flex-row justify-between items-start p-4 bg-secondary gap-4">
        {/* Filters + User Accordion Section */}
        <div className="w-full md:w-2/3 lg:w-3/4 max-h-[500px] p-4">
            <FiltersDropdown onChange={setFilters} />
            <div className="flex justify-center items-center mb-4 mt-6">
            <Carousel className="justify-items-center items-center w-full max-w-lg">
                <CarouselContent className="w-full justify-items-center items-center">
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                    <CarouselItem key={user.id}>
                        <UserCard key={user.id} user={user} onLikeSent={handleLike} />
                    </CarouselItem>
                    ))
                ) : (
                    <p className="m-6">No users found.</p>
                )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            </div>
        </div>

        {/* Likes Tabs Section */}
        <div className="w-full md:w-1/3 lg:w-1/3 p-4">
            <Tabs defaultValue="likes" className="w-40">
            <TabsList className="flex w-full justify-around mb-4">
                <TabsTrigger value="likes">Likes Sent</TabsTrigger>
                <TabsTrigger value="liked">Likes Recieved</TabsTrigger>
            </TabsList>

            <TabsContent value="likes">
                <div className="min-h-screen">
                {likes.length === 0 ? (
                    <p className="ml-2">No likes sent yet!</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                    {likes.map((like) => (
                        <MatchCard key={like.liked_id} user={like.liked} />
                    ))}
                    </div>
                )}
                </div>
            </TabsContent>

            <TabsContent value="liked">
                <div className="min-h-screen">
                {likedMe.length === 0 ? (
                    <p className="ml-2">No likes received yet!</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                    {likedMe.map((like) => (
                        <RecievedCard key={like.liker_id} user={like.liker} match={like} />
                    ))}
                    </div>
                )}
                </div>
            </TabsContent>
            </Tabs>
        </div>
        </div>
        </div>
    );
}

export default MainPage;