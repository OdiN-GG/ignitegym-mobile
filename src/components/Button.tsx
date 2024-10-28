import { ButtonSpinner, Button as GsButton, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof GsButton> & {
    title: string
    carregando?: boolean
    tipoButton?: "Principal" | "Segundario"
}

export function Button({ title, carregando= false, tipoButton= "Principal", ...rest} : Props){
    return(
        <GsButton
            w={"$full"}
            h={"$14"}
            bg={tipoButton === "Segundario" ? "transparent" : "$green700"}
            borderWidth={tipoButton === "Segundario" ? "$1" : "$0"}
            borderColor={tipoButton === "Segundario" ? "$green700" : "tranparent" }
            $active={{
                backgroundColor: tipoButton === "Principal" ? "$green500" : "$gray500"
            }}
            {...rest}
        >
            
            {
                carregando ? <ButtonSpinner/> : 

                <Text
                color={tipoButton === "Segundario" ? "$green700" : "$white"}
                fontSize={"$md"}
                fontFamily="$heading"
                >
                    {title}
                </Text>
            }

        </GsButton>
    )
}