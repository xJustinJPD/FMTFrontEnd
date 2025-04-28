import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/Api";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import GroupCard from "@/components/GroupCard";
import AddGroupCard from "@/components/AddGroup";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import MatchCard from "@/components/MatchCard";
import FriendCard from "@/components/FriendCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { ProfileStatsBarChart } from "@/components/charts/BarChart";
import { StatsPieChart } from "@/components/charts/PieChart";




function SocialPage() {
    const [error, setError] = useState(null);
    const [groups, setGroupList] = useState([]);
    const [friends, setFriendsList] = useState([]);
    const [local] = axios;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        local.get("/groups", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            console.log("RESPONSE", response.data);
            setGroupList(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
            
        })
        .finally(() => {
            setLoading(false);
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-full w-full bg-secondary">
                <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin" />
            </div>
        );
    }


    return (
        <div className="bg-secondary w-full min-h-screen p-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side: Groups */}
                <div className="flex-1">
                    <h1 className="text-lg font-bold mx-2">My Groups:</h1>

                    {groups.length === 0 ? (
                        <p className="m-2">You don't have any groups yet!</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {groups.map(group => (
                                <GroupCard key={group.id} group={group} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right side: Create Group + Friends */}
                <div className="w-full lg:w-80 flex flex-col gap-4">
                    <AddGroupCard />

                    {/* Friends List ScrollArea */}
                    <Card className="bg-muted h-[400px] border-none">
                        <CardHeader className="flex items-center justify-between pl-4">
                            <CardTitle className="text-md">Friends</CardTitle>
                            <CardDescription className="text-xs text-muted-foreground">Click on a friend to view stats</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[320px] px-4 py-2">
                                {friends.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No friends yet!</p>
                                ) : (
                                    friends.map(friendMatch => {
                                        const { liker, liked, current_user_id } = friendMatch;
                                        const friend = liker.id === current_user_id ? liked : liker;
                                        return (
                                                    <Drawer>
                                                    <DrawerTrigger asChild className="">
                                                    <button key={friend.id} className="flex justify-between items-center py-3 border-b border-muted-foreground w-full">
                                                        <span className="text-sm font-medium">{friend.username}</span>
                                                        <span className="text-xs text-muted-foreground">{friend.rank}</span>
                                                    </button>
                                                    </DrawerTrigger>
                                            
                                                    <DrawerContent className="p-2 flex flex-col items-center space-y-6 bg-secondary">
                                                        {/* Your two graphs inside the drawer */}
                                                        <div className="flex justify-around w-full rounded-lg pb-4">
                                                            <div className="grid grid-cols-2 gap-4 w-100 max-w-4xl p-2">
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Kills</h3>
                                                                    <p>{friend.stats.kills}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Assists</h3>
                                                                    <p>{friend.stats.assists}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Deaths</h3>
                                                                    <p>{friend.stats.deaths}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">KDA</h3>
                                                                    <p>{friend.stats.kda.toFixed(2)}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">KAPM</h3>
                                                                    <p>{friend.stats.kapm}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Wins</h3>
                                                                    <p>{friend.stats.wins}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Losses</h3>
                                                                    <p>{friend.stats.losses}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Win %</h3>
                                                                    <p>{friend.stats.winpercent}%</p>
                                                                </div>
                                                            </div>
                                                            <ProfileStatsBarChart last20kills={friend?.stats?.last20kills || []} last20deaths={friend?.stats?.last20deaths || []} last20assists={friend?.stats?.last20assists || []} className="w-full"/>
                                                            <StatsPieChart last20kills={friend?.stats?.last20kills || []} last20deaths={friend?.stats?.last20deaths || []} last20assists={friend?.stats?.last20assists || []} className="w-full"/>
                                                        </div>
                                                    </DrawerContent>
                                                    </Drawer>
                                        );
                                    })
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default SocialPage;