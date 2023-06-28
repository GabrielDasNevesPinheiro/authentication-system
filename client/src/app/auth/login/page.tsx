"use client";

import Button from "@/components/button";
import { login } from "@/redux/auth/authSlice";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const server = process.env.SERVER_URL as string;
const key = process.env.API_KEY as string;

type LoginResponse = {
    message: string,
    token: string,
}

export default function LoginPage() {

    const router = useRouter();
    
    const token = useSelector((state: RootState) => state.auth.value);
    const dispatch = useDispatch();
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [output, setOutput] = useState<string>('');

    function usernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
    function passwordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }
    async function submit() {
        
        const loginData = JSON.stringify({
            username: username,
            password: password
        });

        const res: LoginResponse = await (await fetch(`${server}/auth/login`, 
        { 
            method: 'POST', 
            body: loginData, 
            headers: {
                api_key: key,
                'Content-Type': 'application/json'
            }, 
            mode: 'cors'
        })).json();
        
        if(!res.message) return setOutput('Invalid data');

        dispatch(login(res.token));
        router.refresh();


    }

    if (token) router.push("/profile");
    
    

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col items-center space-y-4">
                <h1 className="text-4xl">{output}</h1>
                <input onChange={usernameChange} type="text" name="username" id=""  className="border rounded-2xl text-center px-4 py-2" placeholder="Username here"/>
                <input onChange={passwordChange} type="password" name="password" id="" className="border rounded-2xl text-center px-4 py-2" placeholder="passw***"/>
                <Button onClick={submit}>Login</Button>
            </div>
        </div>
    );
}