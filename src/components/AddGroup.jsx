import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import axios from '../config/Api';
import { useState } from 'react';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
    } from "@/components/ui/sheet";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";


const AddGroupCard = () => {
    const [local] = axios;

    const [form, setForm] = useState({
        group_name: ""
    });

    const [errorMessage, setErrorMessage] = useState("");



    const handleClick = () => {
        local.post('/groups', {
            group_name: form.group_name
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log(response);
            window.location.reload(); 
        })
        .catch(err => {
            console.error(err);
            setErrorMessage(err.response.message);
        });
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    };

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
        <Sheet>
        <SheetTrigger asChild>
            <Button className="m-4 primary">+ Create New Group</Button>
        </SheetTrigger>
        <SheetContent side="right">
            <SheetHeader>
            <SheetTitle>Create New Group</SheetTitle>
            <SheetDescription>
                Name your group and click create to make a new group.
            </SheetDescription>
            </SheetHeader>

            <div className="grid gap-4 p-4">
            <label htmlFor="group_name" className="text-sm font-medium">Group Name</label>
            <Input
                id="group_name"
                name="group_name"
                placeholder="Enter group name"
                value={form.group_name}
                onChange={handleForm}
                onKeyDown={handleKeyDown}
            />
            {errorMessage && (
                <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
            )}
            </div>

            <SheetFooter>
            <Button onClick={handleClick} className="primary">Create</Button>
            <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
            </SheetClose>
            </SheetFooter>
        </SheetContent>
        </Sheet>
        </>
    );
};

export default AddGroupCard;