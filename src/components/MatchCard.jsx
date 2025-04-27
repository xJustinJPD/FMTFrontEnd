import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const MatchCard = ({ user }) => {

    return (
        <>
        <Card className="w-50 shadow-lg p-2">
        <div className='flex justify-around items-center'>
        <CardTitle className="text-lg mx-6">{user.username}</CardTitle>
        </div>
        </Card>
        </>
    );
};

export default MatchCard;