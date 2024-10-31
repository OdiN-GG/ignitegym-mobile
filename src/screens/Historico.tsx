import { CardHistorico } from '@components/CardHistorico'
import { HeaderHistorico } from '@components/HeaderHistorico'
import { Center, SectionList, Text, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'


export function Historico() {

  const [exercicios, setExercicios] = useState([
    {
      title: "30/10/2024",
      data:[
        {
          grupo: [ "Costa"],
          exercicio: [ "Puxada Frontal"]
        },
        {
          grupo: [ "Triceps"],
          exercicio: [ "Triceps Frances"]
        },
        {
          grupo: ["Biceps"],
          exercicio: [ "Biceps Corda"]
        },
        {
          grupo: ["Peito"],
          exercicio: [  "Supino Reto"]
        },
        {
          grupo: ["Ombro"],
          exercicio: ["Levantamento Fontal"]
        },
        
      ]
    },

    {
      title: "31/10/2024",
      data:[
        {
          grupo: ["Biceps"],
          exercicio: ["Biceps Corda"]
        },
        {
          grupo: ["Triceps"],
          exercicio: ["Triceps Corda"]
        },

        
      ]
    }

  ])

  return (
    <VStack 
      flex={1}
      
    >
      <HeaderHistorico/>
      <SectionList
        sections={exercicios}
        keyExtractor={ (item) => item}
        renderItem={({item})=>(
          <CardHistorico
             grupo={item.grupo}
             exercicio={item.exercicio}
          />
        )}
        renderSectionHeader={({section:{title}})=>(
          <Center
          py={"$5"}>
            <Text
            
            color='$gray200'
            fontFamily='$body'
          >
            {title}
          </Text>
          </Center>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            paddingBottom: 100,
            paddingHorizontal: 16
          }
        }

      />
    </VStack>
  )
}