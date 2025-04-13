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



const UserCard = ({ user }) => {
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
            console.log( "like sent", response.data);
        } catch (error) {
            console.error("Error liking user:", error);
        }
    }

    return (
        <>
                <Card className="w-full bg-base-100 shadow-xl">
                    <CardHeader>
                        <CardTitle>{user.username}</CardTitle>
                        <CardDescription>{user.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.bio}
                    </CardContent>
                    <Button onClick={onPress} variant="outline" className="w-full bg-base-100 shadow-xl">
                        Match with user
                    </Button>
                    {/* <CardFooter>
                        <p>View Profile</p>
                    </CardFooter> */}
                </Card>
        </>
    );
};

export default UserCard;