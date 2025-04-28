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
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        local.post("/users", filters, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            const shuffled = [...response.data].sort(() => Math.random() - 0.5);
            setUserList(shuffled);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            }
        })
        .finally(() => {
            setLoading(false);
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-full w-full bg-secondary">
                <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin" />
            </div>
        );
    }


    return (
        <div className="w-full min-h-screen bg-secondary overflow-x-hidden">
        <div className="flex flex-col xl:flex-row justify-between items-start p-4 bg-secondary gap-4">
        {/* Filters + User Accordion Section */}
        <div className="w-full md:w-2/3 lg:w-3/4 max-h-[500px] p-2">
        <h1 className="text-lg font-semibold mb-2">Home</h1>
            <FiltersDropdown onChange={setFilters} />
            <div className="flex justify-center items-center mb-4 mt-6">
            <Carousel className="justify-items-center items-center w-full ">
                <CarouselContent className="w-full justify-items-center items-center max-w-lg">
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
                <CarouselPrevious className="lg:absolute left-25 -translate-x-1/2" />
                <CarouselNext className="lg:absolute right-25 translate-x-1/2" />
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
                <div className="min-h-screen w-70">
                    <p className="text-xs ml-2 mt-2">Click a users name to display their stats</p>
                {likedMe.length === 0 ? (
                    <p className="ml-2">No likes received yet!</p>
                ) : (
                    <div className="grid grid-cols-1">
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