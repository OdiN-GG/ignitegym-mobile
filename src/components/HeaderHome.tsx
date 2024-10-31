import { VStack,HStack, Text, Icon, Center } from "@gluestack-ui/themed";
import { UserPhoto } from "./UserPhoto";

import  LogOut  from "@assets/log-out.svg";

export function HeaderHome(){
    return(
        <HStack gap={"$6"} bg="$gray500" pt={"$16"} pb={"$7"} px={"$5"} alignItems="center">
            <UserPhoto 
                alt="Foto de perfil"
                source={{uri:"https://github.com/OdiN-GG.png"}} 
            />
            <VStack flex={1}>
                <Text 
                    fontFamily="$body"
                    color="$gray100"
                >
                    Olá
                </Text>

                <Text 
                    fontFamily="$heading"
                    color="$white"
                >
                    Wallison Da Silva
                </Text>
            </VStack>
           
            <Icon as={LogOut} color="$gray100"/>
            
            

        </HStack>
    )
}