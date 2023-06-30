"use client";

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";


export interface SessionProps {
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    token: string,
    setToken: Dispatch<SetStateAction<string>>,
};

// default states
const GlobalContext = createContext<SessionProps>({
    username: '',
    setUsername: (): string => '',
    token: '',
    setToken: (): string => '',
});

export const ContextProvider = ({children}: { children: React.ReactNode}) => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');

    return (
        <GlobalContext.Provider value={{ username, setUsername, token, setToken }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);