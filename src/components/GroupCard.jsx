import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const GroupCard = ({ group }) => {

    return (
        <>
                <Card className="w-full bg-base-100 shadow-xl">
                    <CardHeader>
                        <CardTitle>{group.group_name}</CardTitle>
                    </CardHeader>
                    {/* <CardFooter>
                        <p>View Profile</p>
                    </CardFooter> */}
                </Card>
        </>
    );
};

export default GroupCard;