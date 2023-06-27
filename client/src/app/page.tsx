"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";


export default function Home() {

    const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-screen justify-center">
      <div className="flex flex-col p-6 items-center space-y-8">
        <h1 className="text-4xl">Welcome!</h1>
        <div className="flex  space-x-2 text-xl">
          <Button onClick={() => router.push("/auth/login") }>Login</Button>
          <Button onClick={() => { router.push("/auth/register") }}>Register</Button>
        </div>
      </div>
    </div>
  );
}
