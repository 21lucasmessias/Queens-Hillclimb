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
  numberOfAllocatedQueens: number
  setNumberOfQueens: React.Dispatch<React.SetStateAction<number>>
  execute: () => void
}

export function Header({
  numberOfQueens,
  numberOfAllocatedQueens,
  setNumberOfQueens,
  execute,
}: HeaderProps) {
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
  )
}
