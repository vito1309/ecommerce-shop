import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthResponse, UserResponse } from "../dtos/auth.dto";

interface AuthContextType {
    user: UserResponse | null;
    signIn: (data: AuthResponse) => void;
    signOut: () => void;
}


const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProviderProps = {
    children : ReactNode
}
    export function AuthContextProvider({
        children
    }: AuthContextProviderProps) {

        const [user, setUser] = useState<UserResponse | null>(null); 
        
        useEffect(() => {
            const userStoraged = localStorage.getItem('user');
            //const tokenStoraged = localStorage.getItem('token');

            if (userStoraged) setUser(JSON.parse(userStoraged))

        }, [])


        function signIn(data: AuthResponse){
            setUser(data.user)

            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.accessToken)
        }

        function signOut(){
            setUser(null)

            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
        return(
            <AuthContext.Provider value={{user, signIn, signOut}}>
                {children}
            </AuthContext.Provider>
        )
    }
