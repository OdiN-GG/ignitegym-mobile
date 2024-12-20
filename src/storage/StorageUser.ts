import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/usersDTO";
import { USER_STORAGE } from "./StorageConfig";

export async function storageUserSave(user: UserDTO){
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet(){
    const storage = await AsyncStorage.getItem(USER_STORAGE)

    const user: UserDTO = storage ? JSON.parse(storage) : {}

    return user 
}

export async function storageUserRemove(){
    const storage = await AsyncStorage.removeItem(USER_STORAGE)

    return storage
    
}