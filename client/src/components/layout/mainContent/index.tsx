"use client";

import { useGlobalContext } from "@/app/context/store";
import { GithubIcon } from "lucide-react";



export default function MainContent() {
    const context = useGlobalContext();

    return (
        <div className="flex flex-1 w-full items-center justify-center pl-2 md:pl-20 xl:pl-0 mt-12 mb-12 text-3xl md:text-4xl">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-6">
                    <h1 className="hover:animate-pulse text-center xl:text-left">👋 Welcome to my Authentication app {context.username}</h1>
                    <p className="text-xl hover:animate-pulse pl-16">This is just a test app for learning purposes.</p>
                    <p className="text-xl hover:animate-pulse pl-16">Feel free to explore this code 🚀</p>
                </div>
                <div className="flex flex-col pt-4 self-center md:self-auto">
                    <h2 className="text-3xl"> ⚡ Features ⚡</h2>
                    <ul className="list-disc text-xl pl-20 pt-4">
                        <li>📕 Register account</li>
                        <li>🔑 Login</li>
                        <li>✍ Profile edit</li>
                        <li>🔴 Logout</li>
                        <li>💀 Delete account</li>
                    </ul>
                </div>
                <div className="flex flex-col items-center justify-center pt-12 space-y-2">
                    <a href="mailto:gabrieldasnevespinheiro@gmail.com" className="text-sm">Contact me</a>
                    <div className="flex text-sm">
                        <a href="https://github.com/gabrieldasnevespinheiro">Github</a>
                    </div>
                </div>
            </div>
        </div>
    )
}