import { Flex, Grid, GridItem } from '@chakra-ui/react'

type Position = {
  x: number
  y: number
}

type Square = {
  type: 'empty' | 'queen'
  pos: Position
}

interface BoardProps {
  numberOfQueens: number
  columns: Array<Array<Square>>
  handleSquarePressed: ({ x, y }: Position) => void
}

export function Board({
  numberOfQueens,
  columns,
  handleSquarePressed,
}: BoardProps) {
  return (
    <Flex w="100%" overflow="auto" direction={'column'}>
      <Grid
        templateColumns={`repeat(${numberOfQueens}, 80px)`}
        gap={2}
        marginX="auto"
      >
        {columns.map((column) =>
          column.map((square) => (
            <GridItem
              key={`${square.pos.x}-${square.pos.y}`}
              h={'80px'}
              backgroundColor={
                square.type === 'empty' ? 'gray.600' : 'purple.600'
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
