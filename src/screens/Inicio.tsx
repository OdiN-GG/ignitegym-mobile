import { HeaderHome } from '@components/HeaderHome'
import { Center, FlatList, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Grupo } from './Grupo'
import { useState } from 'react'
import { CardGrupo } from '@components/CardGrupo'

export function Inicio() {
  const [exercicio, setExercicio] = useState(["Puxada alta", "Remada", "Puxada Uni-Lateral", "Serrote", "Puxada Cavalinho", "Remada", "Puxada Uni-Lateral", "Serrote", "Puxada Cavalinho" ])
  const [grupo, setGrupo] = useState<string[]>(["Costa","Ombro","Peito", "Biceps", "Tríceps", "Perna"])
  const [grupoSelecionado, setGrupoSelecionado] = useState("Costa")

  return (
    <VStack flex={1}>

      <HeaderHome/>        
        
      <FlatList
        data={grupo}
        keyExtractor={ (item ) => item }
        renderItem={({item}) => (
          <Grupo 
            name={item}
            onPress={() => setGrupoSelecionado(item)}
            isActive={grupoSelecionado === item}

          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginVertical : 10,
          maxHeight:55,
          minHeight: 55,
        }}
      />
      <HStack 
        
        justifyContent='space-between'
        px={"$5"}

      >
        <Text fontFamily='$heading' color='$gray200'>
          Exercícios
        </Text>
        <Text fontFamily='$body' color='$gray200'>
          {exercicio.length}
        </Text>
      </HStack> 

      <VStack 
        flex={1}
        p={"$3"}
        gap={"$3"}
      >
        <FlatList
          data={exercicio}
          keyExtractor={(item) => item}
          renderItem={({item})=>(
            <CardGrupo nomeExercicio={item} descExercicio='3 séries de 12 repetições'  />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            {
              gap: 10
            }
          }
        />
        
      </VStack>

    </VStack>
  )
}