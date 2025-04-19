import { Link, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import axios from '../config/Api';
import { useState, useEffect } from 'react';

const GroupCard = ({ group }) => {
    const navigate = useNavigate()
    const [local] = axios;
    const [error, setError] = useState("");
    const [ showToast, setShowToast ] = useState(false);

    const handleClick = () => {
        navigate(`/groups/${group.id}`)
    }

    const handleDelete = () => {
        local.put(`/groups/${group.id}/delete`,{},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            console.log("RESPONSE", response);
            navigate(`/social`)

        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        });
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
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
                <Card className="w-full bg-base-100 shadow-xl" onClick={handleClick}>
                    <CardHeader>
                        <CardTitle>{group.group_name}</CardTitle>
                    </CardHeader>
                    {/* <CardFooter>
                        <p>View Profile</p>
                    </CardFooter> */}
                    <CardContent>
                        <CardTitle onClick={handleDelete}>Delete Group</CardTitle>
                    </CardContent>
                </Card>
                {showToast && (
                    <div className="toast toast-top toast-end">
                        <div className="alert alert-success shadow-lg">
                            <div>
                                <span>Group Deleted!</span>
                            </div>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="toast toast-top toast-end">
                        <div className="alert alert-error shadow-lg">
                            <div>
                                <span>{error}</span>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default GroupCard;