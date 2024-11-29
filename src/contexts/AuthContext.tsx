import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "@services/api";

import { UserDTO } from "@dtos/usersDTO";
import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "@storage/StorageAuthToken";
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

    async function storageUserAndToken(userData: UserDTO, token : string){
      try {
        setIsLoadingUserStorageData(true)

        await storageUserSave(userData)
        await storageAuthTokenSave(token)

      } catch (error) {
        throw error
      }finally{
        setIsLoadingUserStorageData(false)
      }
    }

    async function updateUserAndToke(userData: UserDTO, token: string){
      try {

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser(userData);

      } catch (error) {
        throw error
      }
    }
    
    async function singIn(email: string, password: string) {
        try {
          const { data } = await api.post('/sessions', { email, password });

         
          if(data.user && data.token) {
            await storageUserAndToken(data.user,data.token)
            updateUserAndToke(data.user, data.token)
          }

        } catch (error) {
          throw error
        }
      }

    async function singOut(){
      try {

        setIsLoadingUserStorageData(true)
        setUser({} as UserDTO )
        await storageUserRemove()
        await storageAuthTokenRemove()

      } catch (error) {
        throw error
      }
    }

    async function loadingUser() {
      try {

        setIsLoadingUserStorageData(true)

        const userLoad = await storageUserGet()
        const token = await storageAuthTokenGet()

        if (userLoad && token) {
          updateUserAndToke(userLoad, token)
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