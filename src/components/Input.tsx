import { Input as GsInput, InputField } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField>

export function Input({...rest}:Props){
    return(
        <GsInput
            h={"$14"}
            w={"$full"}
            borderColor="$green700"

        >
            <InputField
                color="$white"
                {...rest}   
            
            />
        </GsInput>
    )
}