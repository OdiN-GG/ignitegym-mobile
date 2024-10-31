import { BottomTabNavigationProp, createBottomTabNavigator, } from "@react-navigation/bottom-tabs";

import { Inicio } from "@screens/Inicio";
import { Historico } from "@screens/Historico";
import { Perfil } from "@screens/Perfil";
import { Exercicios } from "@screens/Exercicios";

import IconInicio from "@assets/home.svg"
import IconHistorico from "@assets/history.svg"
import IconPerfil from "@assets/profile.svg"

import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Platform } from "react-native";

type PropsRotas = {
    Inicio: undefined
    Historico: undefined
    Perfil: undefined
    Exercicios: undefined
}

export type PropsRotasApp = BottomTabNavigationProp<PropsRotas> 

const { Navigator, Screen} = createBottomTabNavigator<PropsRotas>()

export function AppRoutes(){

    const {tokens } = gluestackUIConfig

    const iconSize = tokens.space["7"]

    return(
        <Navigator 
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: tokens.colors.green700,
                tabBarInactiveTintColor: tokens.colors.gray200,
                tabBarStyle: {
                    backgroundColor: tokens.colors.gray500,
                    height: Platform.OS === "android" ? "auto" : 96,
                    borderTopWidth: 0,
                    paddingBottom: tokens.space['10'],
                    paddingTop: tokens.space['6'],

                }
                
            }}
        >
            <Screen
                name="Inicio"
                component={Inicio}
                options={{
                    tabBarIcon: ({color}) => (
                        <IconInicio fill={color} width={iconSize} height={iconSize}/>
                    )
                }}
            />
            <Screen
                name="Historico"
                component={Historico}
                options={{
                    tabBarIcon: ({color}) => (
                        <IconHistorico fill={color} width={iconSize} height={iconSize}/>
                    )
                }}
            />
            <Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: ({color}) => (
                        <IconPerfil fill={color} width={iconSize} height={iconSize}/>
                    )
                }}
            />
            <Screen
                name="Exercicios"
                component={Exercicios}
                options={{
                    tabBarButton: () => null
                }}
            />
        </Navigator>
    )
}