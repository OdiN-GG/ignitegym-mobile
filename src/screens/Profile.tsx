/* eslint-disable no-useless-return */
import { ScrollView, TouchableOpacity } from 'react-native'
import { Center, Heading, Text, Toast, useToast, VStack } from '@gluestack-ui/themed'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { ToastMessage } from '@components/ToastMessage'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { UserPhoto } from '@components/UserPhoto'
import { useAuth } from '@hooks/useAuth'

import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import * as yup from "yup"

import defoulUserImg from "@assets/userPhotoDefault.png"

import { yupResolver } from '@hookform/resolvers/yup'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'

type FormDataProps = {
  name: string ,
  email: string ,
  old_password: string ,
  password: string ,
  comfirm_password: string 
}

const profileSchema: yup.AnyObjectSchema = yup.object({
  name: yup
    .string()
    .required("Informe o nome"),
    

    old_password: yup
    .string()
    .min(6, "deve conter 6 caracteres")
    .nullable()
    .transform((value) => !!value ? value : null)
    ,

    
    
    password: yup
    .string() 
    .min(6, "deve conter 6 caracteres")
    .nullable()
    .transform((value) => !!value ? value : null),

    
  comfirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf( [yup.ref("password"), null] , "As senha não conferem")
    .when("password" , { 
      is: (s: any) => s,
      then: (s) => s.required("Comfirme sua senha."), 
      otherwise: (s) => s, 
      
    })
})

export function Profile() {
  const [ isUpdate, setIsUpdate] = useState(false)
  const [userPhoto, setUserPhoto] = useState<string>("")

  const toast = useToast()

  const {user, updateDateUser} = useAuth()

  const {control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues:{
      name : user.name,
      email : user.email,
    },
    resolver: yupResolver(profileSchema) 
  })

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos' ],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      const photoUri = photoSelected.assets[0].uri

      if (photoUri) {
        const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
          size: number
        }

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Essa imagem é muito grande. Escolha uma de até 5MB"
                onClose={() => toast.close(id)}
              />
            ),
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleProfileUpdate(data : FormDataProps){
    try {

      setIsUpdate(true)

      const userUpdated = user

      userUpdated.name = data.name

      await api.put("users", data)

      await updateDateUser(userUpdated)


    } catch (error) {

      const isAppError = error instanceof AppError 

      const title = isAppError ? error.message : "Tente novamente mias tarde"

      toast.show({
        placement: 'top',
        render:({id}) => (
          <ToastMessage
            id={id}
            action='error'
            title={title}
            onClose={ ()=> toast.close(id)}
            
          />
        )
      })
    }finally{
      setIsUpdate(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={userPhoto === "" ? defoulUserImg : userPhoto }
            size="xl"
            alt="Imagem do usuário"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">

            <Controller 
              control={control}
              name='name'
              render={({field : { value, onChange}}) => (
                <Input 
                  placeholder="Nome" 
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller 
              control={control}
              name='email'
              render={({field : { value, onChange}}) => (
                <Input 
                  value={value}
                  onChangeText={onChange}
                  bg="$gray600" 
                  isReadOnly
                 />
              )}
            />
            
          </Center>

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$2"
          >
            Alterar senha
          </Heading>

          <Center w="$full" gap="$4">

          <Controller 
              control={control}
              name='old_password'
              render={({field : { value, onChange}}) => (
                <Input 
                  placeholder="Sua senha" 
                  bg="$gray600"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.old_password?.message}
                />
              )}
            />
          <Controller 
              control={control}
              name='password'
              render={({field : { value, onChange}}) => (
                <Input 
                  placeholder="Nova senha" 
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            
            <Controller 
              control={control}
              name='comfirm_password'
              render={({field : { value, onChange}}) => (
                <Input 
                  placeholder="Confirme a nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.comfirm_password?.message}
                />
              )}
            />
           
            <Button 
              title="Atualizar"
              onPress={handleSubmit(handleProfileUpdate)} 
              isLoading={isUpdate}            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
