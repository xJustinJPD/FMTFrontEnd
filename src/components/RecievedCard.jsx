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

const RecievedCard = ({ user, match }) => {
    const [local] = axios;
    const [error, setError] = useState("");
    const errorStyle = {
        color: "red",
        fontSize: "12px",
        marginTop: "5px",
    };
    

    const onAccept = () => {
        local.put(`/likes/${match.id}/accept`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            console.log("RESPONSE", response.data);
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
                <div>
                    <Button variant="outline" className="w-1/2 mt-4" onClick={onAccept}>Accept</Button>
                    <Button variant="outline" className="w-1/2 mt-4" onClick={onDecline}>Decline</Button>
                </div>
                <p style={errorStyle}>{error}</p>
        </>
    );
};

export default RecievedCard;