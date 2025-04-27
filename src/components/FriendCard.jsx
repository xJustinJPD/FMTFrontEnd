import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import riotLogo from '../assets/Riot-Games.png';
import discordLogo from '../assets/discord.png';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const FriendCard = ({ user }) => {

    return (
        <>
        <Card className="w-100 shadow-lg p-2">
        <div className='flex justify-between items-center'>
        <CardTitle className="text-lg font-bold mx-6">{user.username}</CardTitle>
        {/* Card Header: Username, Riot Logo (Popover), and Discord Logo */}
        <div className="flex items-center justify-around">
        
        <div className="flex items-center space-x-4">


            {/* Riot Logo with Popover */}
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
        </div>

        {/* Discord Logo */}
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
        </Card>
        </>
    );
};

export default FriendCard;