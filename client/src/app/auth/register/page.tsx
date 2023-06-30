"use client";

import AppBar from "@/components/layout/appBar";
import RegisterForm from "@/components/layout/registerForm";
import MainDiv from "@/components/ui/main";


export default function RegisterPage () {

    return (
        <MainDiv>
            <AppBar />
            <div className="flex flex-1 items-center">
                <div className="flex flex-col m-4 justify-center">
                    <RegisterForm/>
                </div>
            </div>
        </MainDiv>
    )
}