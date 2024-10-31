import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

type Props = {
    grupo: string
    exercicio: string
}
export function CardHistorico({grupo, exercicio}: Props){
    return(
        <HStack
            bg="$gray500"
            alignItems="center"
            p={"$5"}
            rounded={"$md"}
            my={"$2"}
        >
            <VStack
                flex={1}
            >
                <Heading
                    color="$gray200"
                    fontFamily="$heading"
                >
                    {grupo}
                </Heading>
                <Text
                    color="$gray200"
                    fontFamily="$body"
                >
                    {exercicio}
                </Text>
            </VStack>

            <Text
                color="$gray300"
                fontFamily="$body"
            >
                8:30
            </Text>
        </HStack>
    )
}