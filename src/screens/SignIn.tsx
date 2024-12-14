import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  Toast,
  ToastTitle,
  useToast,
  VStack,
} from '@gluestack-ui/themed'


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
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { useState } from 'react';

type FormDataProps = {
  email: string
  password: string
}

const singUpSchema = yup.object({
    email: yup.string().required("Digite seu E-mail").email("E-mail incorreto"),
    password: yup.string().required("Digite sua senha ").max(6 , "A senha deve conter 6 letras ou numeros"),
})
  

export function SignIn() {

const {control, handleSubmit, formState: {errors}  } = useForm<FormDataProps>({
  resolver: yupResolver(singUpSchema),
})
const navigation = useNavigation<AuthNavigatorRoutesProps>()

 const {singIn} = useAuth()

 const toast = useToast()

 const [isLoading, setIsLoading] = useState(false)

  function handleNewAccount() { 
    navigation.navigate('signUp')
  }

  async function handleSingIn({email, password}: FormDataProps) {
    try {
      setIsLoading(true)
      await singIn(email, password)
      

    } catch (error) {

      setIsLoading(false)

      const isAppErro = error instanceof AppError

      const title = isAppErro ? error.message : "Tente novamnete mais tarde"


     toast.show({
      placement: "top",

      render: () => {
        return(
          <Toast
            bg='$red500'
            mt={'$16'}
          
          >
            <ToastTitle color='$white'>{title}</ToastTitle>
          </Toast>
        )
      }
     })

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
                  secureTextEntry

                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            /> 

            <Button 
            onPress={handleSubmit(handleSingIn)}
            title="Acessar" 
            isLoading={isLoading}
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
