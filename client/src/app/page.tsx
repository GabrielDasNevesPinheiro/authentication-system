"use client";

import { useRouter } from "next/navigation";


export default function Home() {

    const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-screen justify-center">
      <div className="flex flex-col p-6 items-center space-y-8">
        <h1 className="text-4xl">Welcome!</h1>
        <div className="flex  space-x-2 text-xl">
          <button className="rounded-xl py-2 w-28 bg-red-600" onClick={() => { router.push("/auth/login") }}>Login</button>
          <button className="rounded-xl py-2 w-28 bg-red-600" onClick={() => { router.push("/auth/register") }}>Register</button>
        </div>
      </div>
    </div>
  );
}
