"use client";

import { Button } from "@/components/ui/button";
import { Sun, Moon, User, KeyIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTheme } from 'next-themes';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LoginForm } from "../loginForm";
import UserCard from "../userCard";
import Link from "next/link";
import { useGlobalContext } from "@/app/context/store";

function AppBar() {

    const { setTheme, theme } = useTheme();
    const [loaded, setLoaded] = useState<boolean>(false);
    const { token } = useGlobalContext();

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (

        <div className="bg-secondary flex w-screen p-4 text-xl justify-between items-center"> {/* Theme change */}

            <div className="flex pl-4 space-x-2 items-center">
                <KeyIcon />
                <Link href={'/'}>Authentication App</Link>
            </div>
            <div className="flex space-x-[0.4rem]">

                {/* User Button, if logged must show logout option, if not must display login panel */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"link"}><User /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">{
                        token && <UserCard /> || <LoginForm />
                    }</PopoverContent>
                </Popover>

                {/* Button to switch theme */}
                {loaded && 
                <Button variant={"link"} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{
                        theme === "dark" && 
                            <Sun /> || 
                            <Moon />
                    }</Button>
                }
            </div>

        </div>
    );
}


export default AppBar;