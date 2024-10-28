import { ScrollView, VStack , Text, Image, Center, Heading} from "@gluestack-ui/themed"

import { useNavigation } from "@react-navigation/native"

import { PropsDasRotasPublicas } from "@routes/auth.routes"

import imgBg from "@assets/background.png"
import Logo from "@assets/logo.svg"

import { Input } from "@components/Input"
import { Button } from "@components/Button"



export function SingIn() {

    const navegação = useNavigation<PropsDasRotasPublicas>()

    function handlerCriarConta(){
        navegação.navigate("SingUp")
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <VStack 
                flex={1} 
                
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

                        <Input placeholder="E-mail" keyboardType="email-address" />
                        <Input placeholder="Senha" keyboardType="numeric" secureTextEntry/>

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
                            onPress={handlerCriarConta}
                        >

                        </Button>
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    )

}