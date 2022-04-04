import { useMemo } from 'react'

import { Queen } from './Types'

interface HillClimbProps {
  queens: Array<Queen>
  numberOfQueens: number
  numberOfAllocatedQueens: number
  setQueens: React.Dispatch<React.SetStateAction<Queen[]>>
}

export const useHillClimb = ({
  numberOfQueens,
  queens,
  setQueens,
}: HillClimbProps) => {
  const handleMoveQueen = (column: number) => {
    const newQueens: Array<Queen> = [...queens]
    const queen = newQueens.find((_queen) => _queen.pos.col === column)

    if (!queen) {
      return
    }

    if (queen.pos.row + 1 === 8) {
      queen.pos.row = 0
    } else {
      queen.pos.row = queen.pos.row + 1
    }

    setQueens(newQueens)
  }

  const execute = () => {
    for (let col = 0; col < numberOfQueens; col++) {
      handleMoveQueen(col)
    }
  }

  const value = useMemo(() => {
    return {
      handleMoveQueen,
      execute,
    }
  }, [handleMoveQueen, execute])

  return value
}
