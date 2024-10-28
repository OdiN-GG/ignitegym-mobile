import { ScrollView, VStack , Text, Image, Center, Heading} from "@gluestack-ui/themed"

import { useNavigation } from "@react-navigation/native"

import { PropsDasRotasPublicas } from "@routes/auth.routes"

import imgBg from "@assets/background.png"
import Logo from "@assets/logo.svg"

import { Input } from "@components/Input"
import { Button } from "@components/Button"


export function SingUp() {

    const navegação = useNavigation<PropsDasRotasPublicas>()

    function handlerTelaLogin(){
        navegação.navigate("SingIn")
    }

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
                            Crie sua conta
                         </Heading>

                        <Input placeholder="Nome" keyboardType="default"/>
                        <Input placeholder="E-mail" keyboardType="email-address"/>
                        <Input placeholder="Senha" keyboardType="numeric" secureTextEntry/>
                        <Input placeholder="Confirmar senha" keyboardType="numeric" secureTextEntry/>


                        <Button
                        title="Criar e acessar"
                        carregando={true}
                        >
                            
                        </Button>


                    </Center>


                    <Center 
                        py={"$10"}
                        gap={"$2"}
                    >
                    
                        <Button
                            title="Voltar para Login"
                            tipoButton="Segundario"
                            onPress={handlerTelaLogin}

                        >

                        </Button>
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    )

}