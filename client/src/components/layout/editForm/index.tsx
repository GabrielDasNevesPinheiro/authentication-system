"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Label } from '@/components/ui/label';
import { CheckCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { User } from '@/model/User';
import { useGlobalContext } from '@/app/context/store';
import { UpdateRequest } from '@/controllers/RequestController';
import { UpdateResponse } from '@/model/Response';

const formSchema = z.object({
    username: z.string().min(3).max(65),
    password: z.string().min(8, { message: "Please, validate your password." }).max(100, { message: "Please, validate your password." })
});

export function EditUserForm() {
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState('');
    const {setToken, setUsername, token, username } = useGlobalContext();
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        const user: User = { username: values.username, token }
        const res: UpdateResponse = await UpdateRequest(user, values.username, values.password);

        if(res.message) {
            setUsername(values.username);
            setToken(res.token);
            setChanged(true);
        }

        if(res.error) {
            setError("Check your password or username");
        }
        

    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    return ( !changed ?
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="new username" autoComplete="true" {...field} />
                            </FormControl>
                            <FormDescription>
                                Type your new beautiful username
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField 
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder='confirm your password' type='password' {...field} />
                            </FormControl>
                            <FormDescription>
                                Just for security
                            </FormDescription>
                            <FormMessage />
                            <FormDescription className='text-red-600'>{error}</FormDescription>
                        </FormItem>
                    )} />
                    <Button type='submit'>Change</Button>
            </form>
        </Form> : 
        <div className='flex space-x-3 items-center '>
            <Label className='text-3xl text-center animate-pulse'>Username Changed</Label>
            <CheckCircleIcon className='animate-pulse'/>
        </div>
    )

}

