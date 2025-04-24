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
                <Card className="w-2/3 bg-base-100 shadow-xl">
                    <CardHeader>
                        <CardTitle>{user.username}</CardTitle>
                        <CardDescription>{user.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.bio}
                    </CardContent>
                    {/* <CardFooter>
                        <p>View Profile</p>
                    </CardFooter> */}
                </Card>
        </>
    );
};

export default MatchCard;