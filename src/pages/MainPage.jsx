import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/Api";
import UserCard from "../components/UserCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import FiltersDropdown from "@/components/Filters";



function MainPage() {
    const [error, setError] = useState(null);
    const [users, setUserList] = useState([]);
    const [local] = axios;
    const [filters, setFilters] = useState({
    });

    useEffect(() => {
        local.post("/users", filters,{
            headers: {
    
            }
        })
        .then(response => {
            setUserList(response.data);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        });
    }, [filters, local]);


    console.log(users);
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
        <div className="flex justify-center items-center min-h-screen p-4">
            <FiltersDropdown onChange={setFilters} />
            <Carousel className="w-full max-w-lg">
                <CarouselContent>
                    {users.map((user) => (
                            <CarouselItem key={user.id}>
                                <UserCard key={user.id} user={user} />
                            </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default MainPage;