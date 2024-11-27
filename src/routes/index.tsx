import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Box } from '@gluestack-ui/themed'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { useAuth } from '@hooks/useAuth'
import { Loading } from '@components/Loading'


export function Routes() {
  const theme = DefaultTheme
  
  const { user, isLoadingUserStorageData } = useAuth();

  if (isLoadingUserStorageData) {
    <Loading/>
  }
  

  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  return (
    <Box flex={1} bg="$gray700">''
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes/> : <AuthRoutes/>}
      </NavigationContainer>
    </Box>
  )
}
''