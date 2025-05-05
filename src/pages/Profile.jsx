import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/Api";
import UserCard from "../components/UserCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import GroupCard from "@/components/GroupCard";
import { Button } from "@/components/ui/button";
import { ProfileStatsChart } from "@/components/charts/AreaChart";
import { StatsPieChart } from "@/components/charts/PieChart";
import { BarChart, CrosshairIcon, PencilIcon, SwordIcon } from "lucide-react";
import { ProfileStatsBarChart } from "@/components/charts/BarChart";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tooltip } from "@/components/ui/tooltip";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { UserIcon, TrophyIcon, HelpCircleIcon, Crosshair } from "lucide-react";
import riotLogo from '../assets/Riot-Games.png';
import discordLogo from '../assets/discord.png';
import { useNavigate } from "react-router-dom";


const UserPage = () => {
            const [error, setError] = useState(null);
            const [local] = axios;
            const [user, setUser] = useState([]);
            const [loading, setLoading] = useState(true);
            const navigate = useNavigate();
        
            useEffect(() => {
                local.get(`/profile`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                .then(response => {
                    console.log("RESPONSE", response.data);
                    setUser(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    if (err.response && err.response.data && err.response.data.message) {
                        setError(err.response.data.message);
                    }
                });
            }, [local]);


        const onUpdate = () => {
            navigate('/profile/update', {state: { username: user.username, bio: user.password, role: user.role }});
        }

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
    <>
        <div className="flex flex-col items-center justify-center w-full h-full bg-secondary p-4 space-y-4">
            {/* User Information Card */}
            <Card className="w-full max-w-4xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-6">
                    <CardTitle className="text-2xl font-semibold ml-2">{user.username}</CardTitle>
                    <PencilIcon className="w-5 h-5 text-muted-foreground hover:opacity-80" onClick={onUpdate} />
                    </div>
                    <div className="flex items-center space-x-2">
                    <Popover>
                    <PopoverTrigger asChild>
                        <img src={riotLogo} alt="Riot Games Logo" className="w-12 h-auto cursor-pointer hover:opacity-80 transition" />
                    </PopoverTrigger>
                    <PopoverContent className="text-center w-30 h-15">
                        <div className="flex flex-col items-center space-y-1">
                        <p className="font-semibold">{user.riot_name} #{user.riot_tag}</p>
                        </div>
                    </PopoverContent>
                    </Popover>
                    <div className="flex items-center gap-2">
                    <CardDescription className="text-muted-foreground">
                    <a 
                    href={`https://discord.com/users/${user.discord_id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition"
                    >
                    <img src={discordLogo} alt="Discord Logo" className="w-15 h-15" />
                    </a>
                </CardDescription>
                    </div>
                    </div>
                </div>
                <CardContent className="flex items-center justify-around gap-4">
                    <div className="flex items-center gap-2">
                        <UserIcon className="w-5 h-5" />
                        <span>{user.first_name} {user.last_name}</span>
                    </div>


                    <div className="flex items-center gap-2">
                        <Tooltip content="Rank">
                            <TrophyIcon className="w-5 h-5" />
                        </Tooltip>
                        <span className="">{user.rank}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Tooltip content="Role">
                        <SwordIcon/>
                        </Tooltip>
                        <span>{user.role}</span>
                    </div>
                </CardContent>
            </Card>

            {/* User Stats Grid */}
            <div className="grid grid-cols-4 gap-4 w-full max-w-4xl p-2">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Kills</h3>
                    <p>{user.stats.kills}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Assists</h3>
                    <p>{user.stats.assists}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Deaths</h3>
                    <p>{user.stats.deaths}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">KDA</h3>
                    <p>{user.stats.kda.toFixed(2)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">KAPM</h3>
                    <p>{user.stats.kapm}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Wins</h3>
                    <p>{user.stats.wins}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Losses</h3>
                    <p>{user.stats.losses}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Win %</h3>
                    <p>{user.stats.winpercent}%</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="flex justify-around w-full p-4 bg-secondary rounded-lg">
                <ProfileStatsBarChart last20kills={user?.stats?.last20kills || []} last20deaths={user?.stats?.last20deaths || []} last20assists={user?.stats?.last20assists || []} className="w-full"/>
                <StatsPieChart last20kills={user?.stats?.last20kills || []} last20deaths={user?.stats?.last20deaths || []} last20assists={user?.stats?.last20assists || []} className="w-full"/>
            </div>
        </div>
    </>
    );
    }
    
    export default UserPage;