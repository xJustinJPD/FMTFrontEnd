import { useState, useEffect } from 'react';
import axios from '../config/Api';

function GroupNotifications() {
    const [hasNewGroup, setHasNewGroup] = useState(false);
    const [local] = axios;

    useEffect(() => {
        const interval = setInterval(() => {
            local.get('/notifications/groups', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(res => {
                setHasNewGroup(res.data.length > 0);
            }).catch(err => {
                console.error("Polling error", err);
            });
        }, 5000); // 5 seconds

        return () => clearInterval(interval);
    }, [local]);

    return hasNewGroup;
}

export default GroupNotifications;