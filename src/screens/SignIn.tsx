import {
  Alert,
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  Toast,
  VStack,
} from '@gluestack-ui/themed'

import axios from 'axios'

import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { api } from '@services/api';

type FormDataProps = {
  email: string
  password: string
}

const singUpSchema = yup.object({
    email: yup.string().required("Digite seu E-mail"),
    password: yup.string().required("Digite sua senha "),
})
  

export function SignIn() {

const {control, handleSubmit, formState: {errors}  } = useForm<FormDataProps>({
  resolver: yupResolver(singUpSchema),
})
const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSingIn({email, password}: FormDataProps) {
    try {
      const reposnse = await api.post("/users", {email, password})
      console.log(reposnse)

    } catch (error) {
      if (axios.isAxiosError(error)) {
        
         console.log(error.response?.data.message)
      }
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          w="$full"
          h={624}
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          position="absolute"
        />

        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />

            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e seu corpo
            </Text>
          </Center>

          <Center gap="$2">
            <Heading color="$gray100">Acesse sua conta</Heading>
            
            <Controller 
              control={control}
              name='email'
              render={({field: {onChange, value}})=> (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            /> 

            <Controller 
              control={control}
              name='password'
              render={({field: {onChange, value}})=> (
                <Input
                  placeholder="Senha"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            /> 

            <Button 
            onPress={handleSubmit(handleSingIn)}
            title="Acessar" 
            />
          </Center>

          <Center flex={1} justifyContent="flex-end" marginTop="$4">
            <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
              Ainda não tem acesso?
            </Text>

            <Button
              title="Criar conta"
              variant="outline"
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
