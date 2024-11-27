import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "@services/api";

import { UserDTO } from "@dtos/usersDTO";
import { storageUserGet, storageUserSave, storageUserRemove } from "@storage/StorageUser";

type AuthContextDataProps = {
    user: UserDTO
    singIn: (name: string, passsword: string) => Promise<void>
    singOut: ()=> Promise<void>
    isLoadingUserStorageData: boolean

}
type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>( {} as AuthContextDataProps )

export function AuthContextProvider({children}: AuthContextProviderProps) {

    const [user, setUser] = useState<UserDTO>({} as UserDTO);

    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

    async function singIn(email: string, password: string) {
        try {
          const { data } = await api.post('/sessions', { email, password });
         
          if(data.user) {
            setUser(data.user);
            storageUserSave(data.user)
          }
        } catch (error) {
          throw error
        }
      }

    async function singOut(){
      try {

        setIsLoadingUserStorageData(true)
        setUser({} as UserDTO )
        storageUserRemove()

      } catch (error) {
        throw error
      }
    }

    async function loadingUser() {
      try {
        const userLoad = await storageUserGet()

        if (userLoad) {
        setUser(userLoad)
        }

      } catch (error) {
        throw error

      }finally{
        setIsLoadingUserStorageData(false)

      }
    }

    useEffect(() => {
      loadingUser()
    })

    return(
        <AuthContext.Provider 
            value={{ 
              user,
              isLoadingUserStorageData,
              singIn,
              singOut
              
            }}
        >
            {children}

        </AuthContext.Provider>
    )
}