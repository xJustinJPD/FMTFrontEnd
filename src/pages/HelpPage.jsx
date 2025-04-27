import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import riotLogo from '../assets/Riot-Games.png';
import discordLogo from '../assets/discord.png';
import UserCard from '@/components/UserCard';
import { ProfileStatsBarChart } from '@/components/charts/BarChart';
import { StatsPieChart } from '@/components/charts/PieChart';

const fakeUsers = [
        { 
        id: 1, 
        username: "ProJames", 
        rank: "Gold", 
        role: "Mid",
        stats: {
            kills: 100,
            deaths: 50,
            assists: 120,
            kda: 4.0,
            kapm: 2.5,
            wins: 20,
            losses: 10,
            winpercent: 67,
            last20kills: Array(20).fill(5),
            last20deaths: Array(20).fill(2),
            last20assists: Array(20).fill(7),
        }
        },
        { 
        id: 2, 
        username: "MarySniper", 
        rank: "Platinum", 
        role: "Jungle",
        stats: {
            kills: 130,
            deaths: 60,
            assists: 150,
            kda: 4.67,
            kapm: 3.1,
            wins: 23,
            losses: 12,
            winpercent: 66,
            last20kills: Array(20).fill(6),
            last20deaths: Array(20).fill(3),
            last20assists: Array(20).fill(8),
        }
        },
        { 
        id: 3, 
        username: "EatMyWin", 
        rank: "Diamond", 
        role: "Top",
        stats: {
            kills: 160,
            deaths: 70,
            assists: 180,
            kda: 5.1,
            kapm: 3.4,
            wins: 30,
            losses: 8,
            winpercent: 79,
            last20kills: Array(20).fill(7),
            last20deaths: Array(20).fill(2),
            last20assists: Array(20).fill(9),
        }
        },
    ];

    const fakeUser = {
    id: 1,
    username: "User",
    riot_name: "MyRiotName",
    riot_tag: "1234",
    discord_id: "1234567890",
    stats: {
        kills: 150,
        deaths: 80,
        assists: 200,
        kda: 4.37,
        kapm: 3.2,
        wins: 25,
        losses: 15,
        winpercent: 62,
        last20kills: Array(20).fill(5),
        last20deaths: Array(20).fill(2),
        last20assists: Array(20).fill(7),
    }
    };

    const HelpPage = () => {
    const [users] = useState(fakeUsers);

    return (
        <div className="flex flex-col items-center p-8 space-y-12 w-full min-h-screen bg-secondary overflow-x-hidden mb-6">
        <h1 className="text-4xl font-bold mb-4">FindMyTeam Explainer</h1>
        <div className='flex flex-col items-center space-y-4 mt-10 mb-10'>
                    {/* Example Carousel */}
        <h2 className="text-2xl font-semibold">Finding users to play with</h2>
        <p className="text-center max-w-2xl">
            Swipe through users using the arrows. Click on expanded stats to view more information. You can "like" users you're interested in teaming up with!
        </p>

        <Carousel className="justify-items-center items-center w-full ">
            <CarouselContent className="w-full justify-items-center items-center max-w-lg">
            {users.length > 0 ? (
                users.map((user) => (
                <CarouselItem key={user.id}>
                    <UserCard user={user} onLikeSent={() => {}} />
                </CarouselItem>
                ))
            ) : (
                <p className="m-6">No users found.</p>
            )}
            </CarouselContent>
            <CarouselPrevious className="lg:absolute left-15 -translate-x-1/2" />
            <CarouselNext className="lg:absolute right-18 translate-x-1/2" />
        </Carousel>
        </div>


        {/* Example Received Like Card */}
        <h2 className="text-2xl font-semibold mt-12">Accepting/Declining Likes</h2>
        <p className="text-center max-w-2xl mb-6">
            When someone likes you, you'll see a card like this! Accept to add them to your friends list, or decline if you're not interested.
        </p>

        <Card className="w-70 shadow-lg p-4">
            <div className="flex justify-between items-center">
            <CardTitle className="text-sm ml-4">{fakeUser.username}</CardTitle>
            <div className="flex items-center space-x-2">
                <Button className="w-15 happy hover:opacity-80">Accept</Button>
                <Button className="w-15 danger hover:opacity-80">Decline</Button>
            </div>
            </div>
        </Card>

        {/* Friends List Explanation */}
        <h2 className="text-2xl font-semibold mt-12">Finding Friends & Contacting Them</h2>
        <p className="text-center max-w-2xl mb-2">
            After accepting a friend request, the user will appear on your social page. 
        </p>
        <p className="text-center max-w-2xl mb-6">
        To view their Riot and Discord info, add them to a group, and their card will display like this, clicking the discord logo will take you to their discord profile:
        </p>

        {/* Example Friend Card */}
        <Card className="w-100 shadow-lg p-4">
            <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold mx-6">{fakeUser.username}</CardTitle>
            <div className="flex items-center justify-around">
                <div className="flex items-center space-x-4">
                <Popover>
                    <PopoverTrigger asChild>
                    <img src={riotLogo} alt="Riot Games Logo" className="w-12 h-auto cursor-pointer hover:opacity-80 transition" />
                    </PopoverTrigger>
                    <PopoverContent className="text-center w-30 h-20">
                    <div className="flex flex-col items-center space-y-1">
                        <p className="font-semibold">{fakeUser.riot_name} #{fakeUser.riot_tag}</p>
                    </div>
                    </PopoverContent>
                </Popover>
                </div>
                <CardDescription className="text-muted-foreground">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition"
                >
                    <img src={discordLogo} alt="Discord Logo" className="w-15 h-15" />
                </a>
                </CardDescription>
            </div>
            </div>
        </Card>

        </div>
    );
    };

export default HelpPage;