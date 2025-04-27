import { Link, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from 'react';
import GroupNotifications from './GroupNotifs';
import { User } from 'lucide-react';

const GroupCard = ({ group }) => {
    const navigate = useNavigate()
    const [error, setError] = useState("");

    const handleClick = () => {
        navigate(`/groups/${group.id}`)
    }

        const clearError = () => {
            setError(null);
        };
    
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

    return (
        <>
                <Card className="w-full h-18 bg-base-100 shadow-xl" onClick={handleClick}>
                    <div className='flex items-center justify-between'>
                    <CardHeader className="w-full">
                        <CardTitle>{group.group_name}</CardTitle>
                    </CardHeader>
                    <div className="flex items-center space-x-2 mr-5">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{group.users ? group.users.length : 0}</span>
                    </div>
                    </div>
                </Card>
        </>
    );
};

export default GroupCard;