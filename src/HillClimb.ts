import { useMemo } from 'react'
import {
  Column,
  OptimizationAlgorithm,
  OptimizationAlgorithmProps,
} from './App'

import { Position, Queen } from './Types'

export const useHillClimb: (
  props: OptimizationAlgorithmProps
) => OptimizationAlgorithm = ({ queens: initialQueens, setQueens }) => {
  const updateAttackedByAll = (
    queens: Map<Column, Queen>
  ): Map<Column, Queen> => {
    const newQueens = new Map(queens)

    for (let column = 0; column < queens.size; column++) {
      const queen = newQueens.get(column)

      var count = 0

      for (let i = 0; i < queens.size; i++) {
        const queenToCompare = newQueens.get(i)

        if (queenToCompare!.pos.col === queen!.pos.col) {
          continue
        }

        if (queenToCompare!.pos.row === queen!.pos.row) {
          count++
          continue
        }

        if (
          Math.abs(queenToCompare!.pos.row - queen!.pos.row) ===
          Math.abs(queenToCompare!.pos.col - queen!.pos.col)
        ) {
          count++
        }
      }

      queen!.attackedBy = count
    }

    return newQueens
  }

  const moveQueen = (
    queens: Map<Column, Queen>,
    column: number
  ): Map<Column, Queen> => {
    var newQueens = new Map(queens)

    const newQueen = newQueens.get(column)

    if (newQueen!.pos.col === column) {
      if (newQueen!.pos.row + 1 === queens.size) {
        newQueen!.pos.row = 0
      } else {
        newQueen!.pos.row = newQueen!.pos.row + 1
      }
    }

    return newQueens
  }

  const moveQueenToBestPosition = (
    queens: Map<Column, Queen>,
    column: number,
    position: Position
  ): Map<Column, Queen> => {
    const newQueens = new Map(queens)

    const newQueen = newQueens.get(column)
    newQueen!.pos = position

    return newQueens
  }

  const delay = (delay: number) => {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay)
    })
  }

  const updateBoard = async (queens: Map<Column, Queen>) => {
    setQueens(queens)
    await delay(1)
  }

  const calculateAttackedByAll = (queens: Map<Column, Queen>): number => {
    return [...queens.values()].reduce(
      (acc, queen) => acc + queen.attackedBy,
      0
    )
  }

  const execute = async () => {
    let queens = updateAttackedByAll(initialQueens)
    let totalQueensAttacked = calculateAttackedByAll(queens)

    let column = parseInt((Math.random() * queens.size).toString(), 10)
    let maxInteractions = 10000
    let numberOfInteractions = 0

    while (
      totalQueensAttacked > 0 &&
      numberOfInteractions !== maxInteractions
    ) {
      let bestPositionForQueen = { ...queens.get(column)!.pos }

      for (let move = 0; move < queens.size; move++) {
        queens = moveQueen(queens, column)
        queens = updateAttackedByAll(queens)

        await updateBoard(queens)

        if (numberOfInteractions / maxInteractions > 0.5) {
          if (queens.get(column)!.attackedBy <= 1) {
            bestPositionForQueen = { ...queens.get(column)!.pos }
            break
          }
        } else {
          if (queens.get(column)!.attackedBy === 0) {
            bestPositionForQueen = { ...queens.get(column)!.pos }
            break
          }
        }
      }

      queens = moveQueenToBestPosition(queens, column, bestPositionForQueen)
      totalQueensAttacked = calculateAttackedByAll(queens)

      column = parseInt((Math.random() * queens.size).toString(), 10)
      numberOfInteractions = numberOfInteractions + 1

      await updateBoard(queens)
    }
    await updateBoard(queens)
  }

  const value = useMemo(() => {
    return {
      execute,
    }
  }, [execute])

  return value
}
