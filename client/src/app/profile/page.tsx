"use client";

import Button from "@/components/button";

export default function ProfilePage() {
    const username = "idk yet";

    function logout() {
        console.log('here you will logout');
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col space-y-4 items-center">
                <h1 className="text-4xl">Logged as: {username}</h1>
                <Button onClick={logout}>Logout</Button>
            </div>
        </div>
    );
}