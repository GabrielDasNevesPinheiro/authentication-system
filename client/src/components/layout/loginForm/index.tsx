"use client";

import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { LoginRequest } from '@/controllers/RequestController';
import { User, UserSchema } from '@/model/User';
import { SessionProps, useGlobalContext } from '@/app/context/store';
import { useState } from 'react';


let router: AppRouterInstance;
let context: SessionProps;

const formSchema = z.object({
    username: z.string().min(3).max(65),
    password: z.string().min(8).max(100),
});

export function LoginForm() {

    const [error, setError] = useState(false);

    router = useRouter();
    context = useGlobalContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        // send data to server, register token if login successfull
        const data: UserSchema = values;
        const res: User = await LoginRequest(data);
    
        if(res.token) {
            context.setUsername(res.username);
            context.setToken(res.token);
            return;
        }

        setError(true); // if bad response
    }
    

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField 
                    control={form.control} 
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='gabriel' autoComplete="true" {...field}/>
                            </FormControl>
                            <FormDescription>
                                Your public name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control} 
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input placeholder='your best passw***' type='password' autoComplete="true" {...field}/>
                            </FormControl>
                            <FormDescription>
                                Type your password.
                            </FormDescription>
                            <FormMessage />
                            <FormDescription className='text-red-600'>{error ? "Please check your credentials and try again" : ""}</FormDescription>
                        </FormItem>
                    )}/>
                    <div className="flex space-x-3">
                        <Button type="submit" >Login</Button>
                        <Button variant={'link'} type='button' onClick={registerButton}>Create account here.</Button>
                    </div>
            </form>
        </Form>
    )
}

function registerButton () {
    router.push("/auth/register");
}