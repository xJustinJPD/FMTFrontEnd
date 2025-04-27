import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import axios from '../config/Api';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { ProfileStatsBarChart } from "@/components/charts/BarChart";
import { StatsPieChart } from "@/components/charts/PieChart";
import { useNavigate } from 'react-router-dom';

const RecievedCard = ({ user, match }) => {
    const [local] = axios;
    const [error, setError] = useState("");
    const errorStyle = {
        color: "red",
        fontSize: "12px",
        marginTop: "5px",
    };
    const navigate = useNavigate();
    

    const onAccept = () => {
        local.put(`/likes/${match.id}/accept`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            console.log("RESPONSE", response.data);
            navigate('/social')
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        });
    }

    const onDecline = () => {
        local.put(`/likes/${match.id}/decline`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            console.log("RESPONSE", response.data);
            window.location.reload();
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
        <Card className="w-70 shadow-lg p-2">
        <div className='flex justify-between items-center'>
        <Drawer>
                                                    <DrawerTrigger asChild className="">
                                                    <button>
                                                    <CardTitle className="text-sm ml-4 hover:opacity-80">{user.username}</CardTitle>
                                                    </button>
                                                    </DrawerTrigger>
                                            
                                                    <DrawerContent className="p-2 flex flex-col items-center space-y-6 bg-secondary">
                                                        {/* Your two graphs inside the drawer */}
                                                        <div className="flex justify-around w-full rounded-lg pb-4">
                                                            <div className="grid grid-cols-2 gap-4 w-100 max-w-4xl p-2">
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Kills</h3>
                                                                    <p>{user.stats.kills}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Assists</h3>
                                                                    <p>{user.stats.assists}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Deaths</h3>
                                                                    <p>{user.stats.deaths}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">KDA</h3>
                                                                    <p>{user.stats.kda.toFixed(2)}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">KAPM</h3>
                                                                    <p>{user.stats.kapm}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Wins</h3>
                                                                    <p>{user.stats.wins}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Losses</h3>
                                                                    <p>{user.stats.losses}</p>
                                                                </div>
                                                                <div className="bg-white p-4 rounded-lg shadow-md max-h-25">
                                                                    <h3 className="text-lg font-semibold">Win %</h3>
                                                                    <p>{user.stats.winpercent}%</p>
                                                                </div>
                                                            </div>
                                                            <ProfileStatsBarChart last20kills={user?.stats?.last20kills || []} last20deaths={user?.stats?.last20deaths || []} last20assists={user?.stats?.last20assists || []} className="w-full"/>
                                                            <StatsPieChart last20kills={user?.stats?.last20kills || []} last20deaths={user?.stats?.last20deaths || []} last20assists={user?.stats?.last20assists || []} className="w-full"/>
                                                        </div>
                                                    </DrawerContent>
                                                    </Drawer>


        <div className="flex items-center space-x-2">
            <Button className="w-15 happy hover:opacity-80" onClick={onAccept}>Accept</Button>
            <Button className="w-15 danger hover:opacity-80" onClick={onDecline}>Decline</Button>
        </div>
        </div>
        </Card>
                <p style={errorStyle}>{error}</p>

        </>
    );
};

export default RecievedCard;