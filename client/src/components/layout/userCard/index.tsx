import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EditUserForm } from "../editForm";
import { useGlobalContext } from "@/app/context/store";
import { DeleteRequest, LogoutRequest } from "@/controllers/RequestController";
import { User } from "@/model/User";

export default function UserCard() {

    const { username, token, setToken, setUsername } = useGlobalContext();

    async function logoutEvent() {
        const user: User = { username, token };
        const res = await LogoutRequest(user);

        if(res) {
            setToken('');
            setUsername('');
        }
    }
    
    async function deleteEvent() {
        const user: User = { username, token };
        const res = await DeleteRequest(user);

        if(res) {
            setToken('');
            setUsername('');
        }
    }

    return (
        <div className="flex flex-col space-y-4 p-2">

            <div className="flex space-x-2 items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3WO7mdsQ9uIINGHDb_6HyPnadfR9Sn3DSTg&usqp=CAU" alt="@username" />
                        <AvatarFallback>SomeUsername</AvatarFallback>
                    </Avatar>
                    <p>{username}</p>
                </div>
                <Button variant={'link'}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Pencil width={'16'} />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>When you finish click Confirm</DialogDescription>
                            </DialogHeader>
                            <EditUserForm />
                        </DialogContent>

                    </Dialog>
                </Button>

            </div>
            <div className="flex space-x-2 items-center justify-center">
                <Button onClick={logoutEvent}>Logout</Button>

                {/* Be sure user want to remove account, this alert will confirm the action */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>Delete account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>Your account will be permanently deleted.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={deleteEvent}>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </div>
    )
}