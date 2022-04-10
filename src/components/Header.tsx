import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
} from '@chakra-ui/react'
import { Column } from '../App'
import { Queen } from '../Types'

interface HeaderProps {
  numberOfQueens: number
  numberOfAllocatedQueens: number
  setNumberOfQueens: React.Dispatch<React.SetStateAction<number>>
  execute: () => void
  queens: Map<Column, Queen>
}

export function Header({
  numberOfQueens,
  numberOfAllocatedQueens,
  setNumberOfQueens,
  execute,
  queens,
}: HeaderProps) {
  return (
    <Flex direction={'column'} w="100%" gap={4}>
      <Heading color={'white'}>Queens Hill Climbing</Heading>

      <Flex w="100%" alignItems={'center'} justifyContent="space-between">
        <InputGroup flexDirection={'column'} w="max-content" flex={1}>
          <Text color="white">Número de rainhas</Text>
          <Input
            value={numberOfQueens}
            type="number"
            onChange={(e) => {
              setNumberOfQueens(e.target.valueAsNumber)
            }}
            color="white"
            maxW="200px"
          />
        </InputGroup>

        <Flex direction={'column'} flex={1}>
          <Text textAlign={'center'} color="white">
            Número totais de ataques
          </Text>
          <Text textAlign={'center'} color="white">
            {[...queens.values()].reduce(
              (acc, queen) => acc + queen.attackedBy,
              0
            )}
          </Text>
        </Flex>

        <Flex flex={1} alignItems="flex-end" direction={'column'}>
          <Button
            colorScheme={'purple'}
            onClick={() => {
              if (numberOfQueens === numberOfAllocatedQueens) execute()
            }}
          >
            Hill-Climb
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
