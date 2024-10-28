import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SingIn } from "@screens/SingIn";
import { SingUp } from "@screens/SingUp";

type RoutesProps = {
    SingIn: undefined
    SingUp: undefined
}

const {Navigator, Screen} = createNativeStackNavigator<RoutesProps>()

export type PropsDasRotasPublicas = NativeStackNavigationProp<RoutesProps>

export function AuthRoutes(){

    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="SingIn" component={SingIn}/>
            <Screen name="SingUp" component={SingUp}/>
        </Navigator>

    )
}