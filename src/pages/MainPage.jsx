import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/Api";
import UserCard from "../components/UserCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import FiltersDropdown from "@/components/Filters";
import MatchCard from "@/components/MatchCard";
import LogoutButton from "@/components/Logout";




function MainPage() {
    const [error, setError] = useState(null);
    const [users, setUserList] = useState([]);
    const [likes, setLikesList] = useState([]);
    const [local] = axios;
    const [filters, setFilters] = useState({
    });

    useEffect(() => {
        local.post("/users", filters,{
            headers: {
    
            }
        })
        .then(response => {
            console.log("RESPONSE", response.data);
            console.log("my token" + `Bearer ${localStorage.getItem('token')}`)
            setUserList(response.data);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        });
    }, [filters, local]);

    useEffect(() => {
        local.get("/likes",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            console.log("LIKES RESPONSE", response.data);

            setLikesList(response.data);
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



    return (
        <>
        <LogoutButton/>
        <div className="flex justify-center items-center min-h-screen p-4">
            <FiltersDropdown onChange={setFilters} />
            <Carousel className="w-full max-w-lg">
                <CarouselContent>
                {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                    <CarouselItem key={user.id}>
                    <UserCard key={user.id} user={user} />
                    </CarouselItem>
                ))
                ) : (
                <p>No users found.</p>
                )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
        <div className="flex justify-center items-center min-h-screen p-4">
                <h2 className="text-lg font-semibold mb-4">People You've Liked:</h2>
                {likes.length === 0 ? (
                    <p>No likes sent yet!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {likes.map((like) => (
                            <MatchCard key={like.liked_id} user={like.liked} />
                        ))}
                    </div>
                )}
            </div>

        </>
    );
}

export default MainPage;