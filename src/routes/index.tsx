import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Box } from '@gluestack-ui/themed'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { useContext } from 'react'
import {AuthContext} from "@contexts/AuthContext"



export function Routes() {

  const contextData = useContext(AuthContext)

  console.log("USUÁRIO LOGADO =>", contextData)

  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  return (
    <Box flex={1} bg="$gray700">''
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
''