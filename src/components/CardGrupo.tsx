import { Heading, HStack, Icon, Image, Text, VStack } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import IconProximo from "@assets/proximo.svg"

type Props = TouchableOpacityProps & {
    nomeExercicio: string
    descExercicio: string
}

import {} from "lucide-react-native"

export function CardGrupo({nomeExercicio, descExercicio, ...props}: Props){
    return(
        <TouchableOpacity
            {...props}
        >
            <HStack 
                bg="$gray500"
                p={"$2"}
                rounded={"$md"}
                alignItems="center"
            >
                <Image 
                    alt="Puxada Alta"
                    source={
                        {
                            uri: "https://s2-ge.glbimg.com/u7ggtx-50ZJ_sW1YWiQ-gkAYNH0=/1200x/smart/filters:cover():strip_icc()/s.glbimg.com/es/ge/f/original/2017/07/14/istock-538489090.jpg"
                        }
                    }
                    rounded={"$md"}
                    mr={"$3"}
                />
                <VStack
                    flex={1}
                >
                    <Heading
                        color="$gray200"
                        fontFamily="$heading"
                    >
                        {nomeExercicio}
                    </Heading>    
                    <Text
                        color="$gray200"
                        fontFamily="$body"
                    >
                        {descExercicio}
                    </Text>
                </VStack>
                <Icon as={IconProximo}/>
            </HStack>
        </TouchableOpacity>
    )
}