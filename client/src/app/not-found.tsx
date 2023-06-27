"use client";

import { useRouter } from "next/navigation";

export default function Notfound() {

    const router = useRouter();

    setTimeout(() => {
        router.push("/");
    }, 5000);

    return (
        <div className="flex flex-col items-center h-screen justify-center text-4xl">
            <h1>404</h1>
            <p>Not found.</p>
        </div>
    );

}