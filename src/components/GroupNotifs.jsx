import { useState, useEffect } from 'react';
import axios from '../config/Api';

function GroupNotifications() {
    const [hasNewGroup, setHasNewGroup] = useState(false);
    const [local] = axios;

    const checkForNewGroup = () => {
        local.get('/notifications/groups', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(res => {
            setHasNewGroup(res.data.length > 0);
        }).catch(err => {
            console.error("Polling error", err);
        });
    }
    

    useEffect(() => {
        checkForNewGroup(); // Initial check
        const interval = setInterval(() => {
            checkForNewGroup(); // Check every 5 seconds
        }, 5000);

        return () => clearInterval(interval); // Cleanup on unmount
    },[]);

    return hasNewGroup;
}

export default GroupNotifications;