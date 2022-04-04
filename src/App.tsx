import { Flex } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { Board } from './components/Board'
import { Header } from './components/Header'
import { useHillClimb } from './HillClimb'

import { Position, Queen, Square } from './Types'

function App() {
  const [numberOfQueens, setNumberOfQueens] = useState<number>(8)
  const [numberOfAllocatedQueens, setNumberOfAllocatedQueens] =
    useState<number>(0)

  const [rows, setRows] = useState<Array<Array<Square>>>([])

  const [queens, setQueens] = useState<Array<Queen>>([])

  const { execute } = useHillClimb({
    queens: queens,
    numberOfAllocatedQueens: numberOfAllocatedQueens,
    setQueens: setQueens,
  })

  useEffect(() => {
    if (typeof numberOfQueens === 'number' && numberOfQueens > 0) {
      const newLines: Array<Array<Square>> = []

      for (let row = 0; row < numberOfQueens; row++) {
        newLines.push([])

        for (let col = 0; col < numberOfQueens; col++) {
          const newSquare: Square = {
            pos: {
              row,
              col,
            },
          }

          newLines[row].push(newSquare)
        }
      }

      setRows(newLines)
      setNumberOfAllocatedQueens(0)
      setQueens([])
    }
  }, [numberOfQueens])

  const hasQueenInColumn = (col: number) => {
    return queens.some((queen) => queen.pos.col === col)
  }

  const allocateQueen = ({ col, row }: Position) => {
    if (numberOfAllocatedQueens < numberOfQueens && !hasQueenInColumn(col)) {
      const newQueen: Queen = {
        pos: {
          col,
          row,
        },
        attackedBy: 0,
      }

      setQueens([...queens, newQueen])
      setNumberOfAllocatedQueens(numberOfAllocatedQueens + 1)
    }
  }

  const removeQueen = ({ row, col }: Position) => {
    const newQueens = queens.filter((queen) => {
      return !(queen.pos.col === col && queen.pos.row === row)
    })

    setQueens(newQueens)
    setNumberOfAllocatedQueens(numberOfAllocatedQueens - 1)
  }

  const hasQueenInSquare = ({ row, col }: Position) => {
    return queens.some(
      (queen) => queen.pos.row === row && queen.pos.col === col
    )
  }

  const handleSquarePressed = (position: Position) => {
    if (hasQueenInSquare(position)) {
      removeQueen(position)
    } else {
      allocateQueen(position)
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
          execute={execute}
        />

        <Board
          rows={rows}
          hasQueenInSquare={hasQueenInSquare}
          handleSquarePressed={handleSquarePressed}
          numberOfQueens={numberOfQueens}
        />
      </Flex>
    </Flex>
  )
}

export default App
