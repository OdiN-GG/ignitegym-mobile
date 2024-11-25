import { createContext, ReactNode } from "react";

import { UserDtop } from "@dtos/usersDto";

type AuthContextDataProps = {
    user: UserDtop
}
type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>( {} as AuthContextDataProps )

export function AuthContextProvider({children}: AuthContextProviderProps) {
    return(
        <AuthContext.Provider 
            value={{
                user: {
                    id: "1",
                    name: "Wa",
                    email:  "wallsasisonlpq@gmail.com",
                    password: "314sasa001",
                    avatar: "a",
                }
            }}
        >
            {children}

        </AuthContext.Provider>
    )
}