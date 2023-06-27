"use client";

import Button from "@/components/button";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function LoginPage() {

    const isLogged = useSelector((state: RootState) => state.auth.value);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [secondPassword, setSecondPassword] = useState<string>('');

    function usernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
    function passwordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }
    function secondPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSecondPassword(event.target.value);
    }
    function submit() {
        console.log(`${username} ${password} ${secondPassword}`);
    }

    if (isLogged) return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl">You cannot create accounts.</h1>
        </div>
    )

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col items-center space-y-4">
                <input onChange={usernameChange} type="text" name="username" className="border rounded-2xl text-center px-4 py-2" placeholder="Username here"/>
                <input onChange={passwordChange} type="password" name="password" className="border rounded-2xl text-center px-4 py-2" placeholder="passw***"/>
                <input onChange={secondPasswordChange} type="password" name="passwordConfirm" className="border rounded-2xl text-center px-4 py-2" placeholder="Confirm password"/>
                <Button onClick={submit}>Create Account</Button>
            </div>
        </div>
    );
}