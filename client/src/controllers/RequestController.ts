"use client";

import { RegisterResponse, UpdateResponse } from "@/model/Response";
import { User, UserSchema } from "@/model/User";


const server = process.env.SERVER_URL as string;
const key = process.env.API_KEY as string;

const headers = {
    api_key: key,
    'Content-Type': 'application/json',
}


export async function LoginRequest(data: UserSchema) {

    const res = await (await fetch(`${server}/auth/login`, {
        headers,
        body: JSON.stringify({ username: data.username, password: data.password }),
        method: 'POST'
    })).json();

    return res;

}

export async function LogoutRequest(user: User) {
    
    const res = await (await fetch(`${server}/auth/logout`, {
        headers: {
            api_key: key,
            authorization: user.token,
        }, method: 'POST'
    })).json();

    if (res.message) {
        return true;
    }

    return false;

}

export async function DeleteRequest(user: User) {

    const res = await (await fetch(`${server}/profile`, {
        headers: {
            api_key: key,
            authorization: user.token,
            'Content-Type': 'application/json',
        }, body: JSON.stringify({ user: user.username }),
        method: 'DELETE'
    })).json();

    if (res.message) {
        return true;
    }

    return false;

}

export async function UpdateRequest(user: User, newName: string, pass: string) {


    const res: UpdateResponse = await (await fetch(`${server}/profile`, {
        headers: {
            api_key: key,
            authorization: user.token,
            'Content-Type': 'application/json',
        }, body: JSON.stringify({ user: user.username, username: newName , password: pass }),
        method: 'PATCH'
    })).json();

    return res;

}

export async function RegisterRequest(user: User, pass: string) {
    const res: RegisterResponse = await (await fetch(`${server}/auth/register`, {
        headers: {
            api_key: key,
            'Content-Type': 'application/json',
        }, body: JSON.stringify({ username: user.username, password: pass }),
        method: 'POST'
    })).json();

    return res;

}