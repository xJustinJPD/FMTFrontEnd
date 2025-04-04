import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const UserCard = ({ user }) => {

    return (
        <>
        <Link to={`/users/${user.id}`}>
                <Card className="w-full bg-base-100 shadow-xl">
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
            </Link>
        </>
    );
};

export default UserCard;