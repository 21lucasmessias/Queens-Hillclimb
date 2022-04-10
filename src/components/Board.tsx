import { Flex, Grid, GridItem, Image, SimpleGrid } from '@chakra-ui/react'
import { Position, Square } from '../Types'

import QueenPicture from '../assets/queen.png'

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
    <Flex w="100%" direction={'column'} h="calc(100vh - 170px)">
      <SimpleGrid columns={numberOfQueens} marginX="auto" h="100%">
        {rows.map((row, ri) =>
          row.map((square, ci) => (
            <GridItem
              display={'flex'}
              alignItems="center"
              justifyContent={'center'}
              justifySelf="center"
              key={`${square.pos.row}-${square.pos.col}`}
              p={2}
              h={`calc((100vh - 170px) / ${numberOfQueens})`}
              w={`calc((100vh - 170px) / ${numberOfQueens})`}
              backgroundColor={
                (ri + ci) % 2 === 0 ? 'gray.700' : 'whiteAlpha.600'
              }
              cursor={'pointer'}
              onClick={() => {
                handleSquarePressed(square.pos)
              }}
            >
              {hasQueenInSquare({
                row: square.pos.row,
                col: square.pos.col,
              }) && <Image src={QueenPicture} />}
            </GridItem>
          ))
        )}
      </SimpleGrid>
    </Flex>
  )
}
