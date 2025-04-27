import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button';
import axios from "../config/Api";
import { UserIcon, TrophyIcon, HelpCircleIcon, SwordIcon, HeartIcon } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
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



const UserCard = ({ user, onLikeSent }) => {
        const [local] = axios;

    const onPress = async () => {
        try{
            const response = await local.post(
                `/like/${user.id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            onLikeSent();
            console.log( "like sent", response.data);
        } catch (error) {
            console.error("Error liking user:", error);
        }
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center w-full h-full bg-secondary p-4 space-y-4">
            {/* User Information Card */}
            <Card className="w-full max-w-4xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl font-semibold ml-2">{user.username}</CardTitle>
                    <Button onClick={onPress} className="danger outline hover:opacity-80 text-white font-bold py-2 px-4 rounded w-auto">
                        <HeartIcon className="w-4 h-4" />
                    </Button>
                </div>
                <CardContent className="flex items-center justify-around gap-4">


                    <div className="flex items-center gap-2">
                        <Tooltip content="Rank">
                            <TrophyIcon className="w-5 h-5" />
                        </Tooltip>
                        <span className="">{user.rank}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Tooltip content="Role">
                            <SwordIcon className="w-5 h-5" />
                        </Tooltip>
                        <span className="">{user.role}</span>
                    </div>
                </CardContent>
            </Card>

            {/* User Stats Grid */}
            <div className="grid grid-cols-4 gap-4 w-full max-w-4xl p-2">
                <div className="bg-white p-4 rounded-lg shadow-md max-h-40">
                    <h3 className="text-lg font-semibold">Kills</h3>
                    <p>{user.stats.kills}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md max-h-40">
                    <h3 className="text-lg font-semibold">Assists</h3>
                    <p>{user.stats.assists}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md max-h-40">
                    <h3 className="text-lg font-semibold">Deaths</h3>
                    <p>{user.stats.deaths}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md max-h-40">
                    <h3 className="text-lg font-semibold">KDA</h3>
                    <p>{user.stats.kda.toFixed(2)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md max-h-40">
                    <h3 className="text-lg font-semibold">KAPM</h3>
                    <p>{user.stats.kapm}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md max-h-30">
                    <h3 className="text-lg font-semibold">Wins</h3>
                    <p>{user.stats.wins}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md max-h-30">
                    <h3 className="text-lg font-semibold">Losses</h3>
                    <p>{user.stats.losses}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md max-h-30">
                    <h3 className="text-lg font-semibold">Win %</h3>
                    <p>{user.stats.winpercent}%</p>
                </div>
            </div>

        <Drawer>
        <DrawerTrigger asChild className="flex justify-center items-center">
            <Button className="extra hover:opacity-80">Expanded Stats</Button>
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
        </div>
        </>
    );
};

export default UserCard;