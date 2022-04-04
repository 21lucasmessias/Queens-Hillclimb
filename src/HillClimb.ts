import { useMemo } from 'react'

import { Queen } from './Types'

interface HillClimbProps {
  queens: Array<Queen>
  numberOfAllocatedQueens: number
  setQueens: React.Dispatch<React.SetStateAction<Queen[]>>
}

export const useHillClimb = ({ queens, setQueens }: HillClimbProps) => {
  console.log({ queens })

  const calculateAttackedBy = (newQueens: Array<Queen>) => {
    newQueens.forEach((queen) => {
      const { col: curCol, row: curRow } = queen.pos

      var count = 0

      newQueens.forEach((_queen) => {
        const { col, row } = _queen.pos

        if (col === curCol) {
          return
        }

        if (row === curRow) {
          count++
          return
        }

        if (Math.abs(row - curRow) === Math.abs(col - curCol)) {
          count++
        }
      })

      queen.attackedBy = count
    })

    return newQueens
  }

  const moveQueen = (column: number) => {
    var newQueens: Array<Queen> = [...queens]
    const queen = newQueens.find((_queen) => _queen.pos.col === column)

    if (!queen) {
      return
    }

    if (queen.pos.row + 1 === 8) {
      queen.pos.row = 0
    } else {
      queen.pos.row = queen.pos.row + 1
    }

    newQueens = calculateAttackedBy(newQueens)
    setQueens(newQueens)
  }

  const execute = () => {
    moveQueen(1)
  }

  const value = useMemo(() => {
    return {
      execute,
    }
  }, [execute])

  return value
}
