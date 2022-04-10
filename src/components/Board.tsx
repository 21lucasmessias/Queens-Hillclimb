import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { Position, Queen, Square } from '../Types'

interface BoardProps {
  numberOfQueens: number
  rows: Array<Array<Square>>
  hasQueenInSquare: ({ row, col }: Position) => boolean
  handleSquarePressed: ({ row, col }: Position) => void
}

export function Board({
  numberOfQueens,
  rows,
  hasQueenInSquare,
  handleSquarePressed,
}: BoardProps) {
  return (
    <Flex w="100%" overflow="auto" direction={'column'}>
      <Grid
        templateColumns={`repeat(${numberOfQueens}, 80px)`}
        gap={2}
        marginX="auto"
      >
        {rows.map((row) =>
          row.map((square) => (
            <GridItem
              key={`${square.pos.row}-${square.pos.col}`}
              h={'80px'}
              backgroundColor={
                hasQueenInSquare({ row: square.pos.row, col: square.pos.col })
                  ? 'purple.600'
                  : 'gray.600'
              }
              cursor={'pointer'}
              onClick={() => {
                handleSquarePressed(square.pos)
              }}
            />
          ))
        )}
      </Grid>
    </Flex>
  )
}
