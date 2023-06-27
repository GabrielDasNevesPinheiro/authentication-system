"use client";

import Button from "@/components/button";
import React, { useState } from "react";

export default function LoginPage() {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function usernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
    function passwordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }
    function submit() {
        console.log(`${username} ${password}`);
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col items-center space-y-4">
                <input onChange={usernameChange} type="text" name="username" id=""  className="border rounded-2xl text-center px-4 py-2" placeholder="Username here"/>
                <input onChange={passwordChange} type="password" name="password" id="" className="border rounded-2xl text-center px-4 py-2" placeholder="passw***"/>
                <Button onClick={submit}>Login</Button>
            </div>
        </div>
    );
}