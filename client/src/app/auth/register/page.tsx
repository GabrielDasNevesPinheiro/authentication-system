"use client";

import Button from "@/components/button";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";


type RegisterResponse = {
    message: string,
}

export default function LoginPage() {

    const isLogged = useSelector((state: RootState) => state.auth.value);
    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [secondPassword, setSecondPassword] = useState<string>('');
    const [output, setOutput] = useState<string>('');

    function usernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
    function passwordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }
    function secondPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSecondPassword(event.target.value);
    }

    const server = process.env.SERVER_URL as string;
    const key = process.env.API_KEY as string;

    async function submit() {


        if (username.length < 3 || password.length < 8) return setOutput('Insert valid values.');
        if (secondPassword !== password) return setOutput('Please confirm password.');

        const registerData = JSON.stringify({
            username: username,
            password: password
        });

        const res: RegisterResponse = await (await fetch (`${server}/auth/register`, { 
            headers: { 
                api_key: key ,
                'Content-Type': 'application/json',
            }, method: 'POST', body: registerData,
        })).json();

        if (res.message) {
            setTimeout(() => {
                router.push("/auth/login");
            }, 5000);
            setOutput("Account Registered.");
        } else {
            setOutput("Error creating account.");
        }
    }

    if (isLogged) router.push("/profile");

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl pb-4">{output}</h1>
            <div className="flex flex-col items-center space-y-4">
                <input onChange={usernameChange} type="text" name="username" className="border rounded-2xl text-center px-4 py-2" placeholder="Username here"/>
                <input onChange={passwordChange} type="password" name="password" className="border rounded-2xl text-center px-4 py-2" placeholder="passw***"/>
                <input onChange={secondPasswordChange} type="password" name="passwordConfirm" className="border rounded-2xl text-center px-4 py-2" placeholder="Confirm password"/>
                <Button onClick={submit}>Create Account</Button>
            </div>
        </div>
    );
}