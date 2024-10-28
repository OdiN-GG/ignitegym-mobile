import { ScrollView, VStack , Text, Image, Center, Heading} from "@gluestack-ui/themed"
import imgBg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Roboto_700Bold } from "@expo-google-fonts/roboto"

import { Input } from "@components/Input"
import { Button } from "@components/Button"


export function SingIn() {
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <VStack 
                flex={1} 
                bg="$gray700"
            >
                <Image 
                    source={imgBg} 
                    alt="Pessoas fazendo cardio" 
                    w={"$full"}
                    h={800}
                    position="absolute"
                />
                <VStack 
                    flex={1}
                    px={"$10"}
                >

                    <Center
                        my={"$24"}
                    >
                        <Logo/>  
                        <Text
                            fontFamily={"$body"}
                            color="$gray100"
                            fontSize={"$sm"}
                        >
                            Treine seu corpo e sua mente
                        </Text>     
                    </Center>

                    
                    <Center
                        gap={"$4"}
                        flex={1}
                        justifyContent="flex-start"
                    >
                        <Heading
                            color="$white"
                            fontFamily="$heading"
                            fontSize={"$xl"}
                        > 
                            Acesse sua conta
                         </Heading>

                        <Input placeholder="E-mail" keyboardType="email-address"/>
                        <Input placeholder="Senha" keyboardType="numeric"/>

                        <Button
                        title="Acessar"
                        >
                            
                        </Button>


                    </Center>


                    <Center 
                        py={"$10"}
                        gap={"$2"}
                    >
                        <Text
                            color="$gray100"
                            fontSize={"$sm"}
                        >
                            Ainda não tem acesso?
                        </Text>
                        <Button
                            title="Criar conta"
                            tipoButton="Segundario"

                        >

                        </Button>
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    )

}