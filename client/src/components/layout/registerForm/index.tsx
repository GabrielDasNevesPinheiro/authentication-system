"use client";

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterRequest } from '@/controllers/RequestController';
import { User } from '@/model/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';


const formSchema = z.object({
    username: z.string().min(3).max(65),
    password: z.string().min(8).max(100),
    password_confirm: z.string()

}).superRefine(({password_confirm, password}, ctx) => {
    if(password_confirm != password) {
        ctx.addIssue({
            message: "The passwords did not match",
            code: z.ZodIssueCode.custom,
            fatal: true,
            path: ['password_confirm']
        })
    }
});

export default function RegisterForm() {
    const [error, setError] = useState('');
    const [registered, setRegistered] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
            password_confirm: '',
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const user: User = { username: values.username, token: '' };
        const res = await RegisterRequest(user, values.password);
        
        if(res.error) return setError(res.error.startsWith("Conflict") ? "Username Unavailable." : "Check your credentials.");
        if(res.message) setRegistered(true);

        setTimeout(() => {
            router.push("/");
        }, 4500);

    }


    return ( !registered ?
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='md:w-96 md:space-y-4 border rounded-xl p-4 m-4'>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='DiamondDog' autoComplete='True' {...field}/>
                            </FormControl>
                            <FormDescription>This will be your public username.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>
                <FormField 
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder='***sword' type='password' {...field} />
                            </FormControl>
                            <FormDescription>Type your password</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>
                <FormField 
                control={form.control}
                name="password_confirm"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm your Password</FormLabel>
                        <FormControl>
                            <Input placeholder='confirm the pas*****' type='password' {...field}/>
                        </FormControl>
                        <FormDescription>Type your password again.</FormDescription>
                        <FormMessage />
                        <FormDescription className='text-red-600'>{error}</FormDescription>
                    </FormItem>
                )} />
                <Button type='submit' className='w-full'>Create account</Button>
            </form>
        </Form> : 
        <Alert className='animate-pulse'>
            <CheckCircleIcon />
            <AlertTitle>Account registered.</AlertTitle>
            <AlertDescription>Click the profile icon to login</AlertDescription>
        </Alert>
    )

}