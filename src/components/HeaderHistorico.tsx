import { Center, Heading } from "@gluestack-ui/themed";

export function HeaderHistorico(){
    return(
        <Center
            bg="$gray500"
            pt={"$14"}
            pb={"$7"}
        >
            <Heading
                fontFamily="$heading"
                color="$gray200"

            >
                Histórico de Exercicios
            </Heading>
        </Center>
    )
}