import { HistoryCard } from '@components/HistoryCard'
import { Loading } from '@components/Loading'
import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryByDayDTO } from '@dtos/HistoryByDay'
import { Heading, Text, Toast, ToastTitle, useToast, VStack } from '@gluestack-ui/themed'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { useCallback, useState } from 'react'
import { SectionList } from 'react-native'

export function History() {
  const [isLoading, setIsLoading] = useState(false)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  const toast = useToast()

  async function fethExerciseHistory(){
    try {
      setIsLoading(true)

      const response = await api.get('history')

      setExercises(response.data)
      
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : "Não foi possível carregar seu Histórico de Treino "

      toast.show({
        placement: "top",
  
        render: (item) => {
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
    }finally{
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fethExerciseHistory()  
  },[]))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? <Loading/> : 
        <SectionList  
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({item}) => <HistoryCard data={item} />}
        renderSectionHeader={({ section }) => (
          <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3">
            {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="$gray200" textAlign="center">
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer execícios hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
      }
    </VStack>
  )
}
