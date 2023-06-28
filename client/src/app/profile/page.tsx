"use client";

import Button from "@/components/button";
import { logout } from "@/redux/auth/authSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";


export default function ProfilePage() {

    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.value );
    const dispatch = useDispatch();

    async function logoutAction() {

        await fetch(`${process.env.SERVER_URL as string}/auth/logout`, { headers: {
            api_key: `${process.env.API_KEY}`,
            authorization: `${token}`
        }});

        dispatch(logout());
        router.refresh();
    }

    if (!token) router.push("/");

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col space-y-4 items-center">
                <h1 className="text-4xl">Logged in.</h1>
                <Button onClick={logoutAction}>Logout</Button>
            </div>
        </div>
    );
}