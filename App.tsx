import { GluestackUIProvider } from '@gluestack-ui/themed';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { SingIn } from '@screens/SingIn';
import { StatusBar } from 'expo-status-bar';
import { config } from "./config/gluestack-ui.config"
import { Loading } from '@components/Loading';
import { SingUp } from '@screens/SingUp';


export default function App() {

  const [loadfonts]= useFonts({Roboto_400Regular, Roboto_700Bold})

  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="auto" />
      {loadfonts ? <SingUp/>: <Loading/>}
    </GluestackUIProvider>
  )
}


