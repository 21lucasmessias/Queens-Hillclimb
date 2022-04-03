import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
} from '@chakra-ui/react'

interface HeaderProps {
  numberOfQueens: number
  setNumberOfQueens: React.Dispatch<React.SetStateAction<number>>
}

export function Header({ numberOfQueens, setNumberOfQueens }: HeaderProps) {
  return (
    <Flex direction={'column'} w="100%" gap={4}>
      <Heading color={'white'}>Queens Hill Climbing</Heading>

      <Flex w="100%" alignItems={'center'} justifyContent="space-between">
        <InputGroup flexDirection={'column'} w="max-content">
          <Text color="white">Número de rainhas</Text>
          <Input
            value={numberOfQueens}
            type="number"
            onChange={(e) => {
              setNumberOfQueens(e.target.valueAsNumber)
            }}
            color="white"
          />
        </InputGroup>

        <Button colorScheme={'purple'}>Hill-Climb</Button>
      </Flex>
    </Flex>
  )
}
