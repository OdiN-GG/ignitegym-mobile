import { Button, Text } from "@gluestack-ui/themed";

import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
    name: string
    isActive?: boolean
}

export function Grupo({name, isActive= false, ...rest}: Props){
    return(
        <Button
        marginLeft={"$5"}
        bg="$gray500"
        borderColor="$green500"
        borderWidth={ isActive ?"$1": "$0"}
            {...rest}
        >
            <Text
                color={isActive ?"$green500": "$gray200"}
            >
                {name}
            </Text>          
        </Button>
    )
}