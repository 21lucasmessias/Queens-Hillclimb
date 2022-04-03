import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Board } from './components/Board'
import { Header } from './components/Header'

type Position = {
  x: number
  y: number
}

type Square = {
  type: 'empty' | 'queen'
  pos: Position
}

function App() {
  const [numberOfQueens, setNumberOfQueens] = useState<number>(8)
  const [numberOfAllocatedQueens, setNumberOfAllocatedQueens] =
    useState<number>(0)

  const [columns, setColumns] = useState<Array<Array<Square>>>([])

  useEffect(() => {
    if (typeof numberOfQueens === 'number' && numberOfQueens > 0) {
      const newColumns: Array<Array<Square>> = []

      for (let x = 0; x < numberOfQueens; x++) {
        newColumns.push([])

        for (let y = 0; y < numberOfQueens; y++) {
          const newSquare: Square = {
            type: 'empty',
            pos: {
              x,
              y,
            },
          }

          newColumns[x].push(newSquare)
        }
      }

      setColumns(newColumns)
      setNumberOfAllocatedQueens(0)
    }
  }, [numberOfQueens])

  const handleAllocateQueen = ({ x, y }: Position) => {
    if (numberOfAllocatedQueens < numberOfQueens) {
      const newColumns: Square[][] = [...columns]

      newColumns[x][y] = {
        ...newColumns[x][y],
        type: 'queen',
      }

      setNumberOfAllocatedQueens(numberOfAllocatedQueens + 1)

      setColumns(newColumns)
    }
  }

  const handleRemoveQueen = ({ x, y }: Position) => {
    const newColumns: Square[][] = [...columns]

    newColumns[x][y] = {
      ...newColumns[x][y],
      type: 'empty',
    }

    setNumberOfAllocatedQueens(numberOfAllocatedQueens - 1)

    setColumns(newColumns)
  }

  const handleSquarePressed = ({ x, y }: Position) => {
    if (columns[x][y].type === 'empty') {
      handleAllocateQueen({ x, y })
    } else {
      handleRemoveQueen({ x, y })
    }
  }

  return (
    <Flex
      w="100%"
      h="100vh"
      direction={'column'}
      backgroundColor="#181A1B"
      overflow="hidden"
    >
      <Flex
        maxW={['100%', '100%', '720px', '1080px']}
        mx="auto"
        direction="column"
        gap={4}
        p={4}
        overflow="hidden"
        w="100%"
      >
        <Header
          numberOfQueens={numberOfQueens}
          setNumberOfQueens={setNumberOfQueens}
        />

        <Board
          columns={columns}
          handleSquarePressed={handleSquarePressed}
          numberOfQueens={numberOfQueens}
        />
      </Flex>
    </Flex>
  )
}

export default App
