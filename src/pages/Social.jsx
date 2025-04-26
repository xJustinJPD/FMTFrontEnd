import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/Api";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import GroupCard from "@/components/GroupCard";
import AddGroupCard from "@/components/AddGroup";




function SocialPage() {
    const [error, setError] = useState(null);
    const [groups, setGroupList] = useState([]);
    const [friends, setFriendsList] = useState([]);
    const [local] = axios;

    useEffect(() => {
        local.get("/groups", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            console.log("RESPONSE", response.data);
            setGroupList(response.data);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        });
    }, [local]);

    useEffect(() => {
        local.get("/friends", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            console.log("RESPONSE", response.data);
            setFriendsList(response.data);
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
        <div className="bg-secondary w-full min-h-screen p-6">
            {/* Top Row: Title + Add Button */}
            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
                <h2 className="text-lg font-semibold">My Groups:</h2>
                <div className="flex flex-col gap-4 items-end">
                    <AddGroupCard />
                    {/* Friends List */}
                    <Card className="w-72 bg-muted">
                        <CardHeader>
                            <CardTitle className="text-md">Friends List</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {friends.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No friends yet!</p>
                            ) : (
                                friends.map((friendMatch) => {
                                    const { liker, liked, current_user_id } = friendMatch;
                                    const friend = liker.id === current_user_id
                                        ? liked
                                        : liker;
                                    return (
                                        <div className="grid grid-cols-1 gap-4">
                                            <MatchCard key={friend.id} user={friend} />
                                        </div>
                                    );
                                })
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Group Cards Table */}
            {groups.length === 0 ? (
                <p>You don't have any groups yet!</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {groups.map((group) => (
                        <GroupCard key={group.id} group={group} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SocialPage;