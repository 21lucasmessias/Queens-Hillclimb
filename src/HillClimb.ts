import { useMemo, useState } from 'react'
import { OptimizationAlgorithm, OptimizationAlgorithmProps } from './App'

import { Position, Queen } from './Types'

export const useHillClimb: (
  props: OptimizationAlgorithmProps
) => OptimizationAlgorithm = ({ queens: initialQueens, setQueens }) => {
  const calculateAttackedBy = (queens: Array<Queen>): Array<Queen> => {
    const newQueens = queens.map((queen) => {
      const newQueen = { ...queen }

      var count = 0

      for (let i = 0; i < queens.length; i++) {
        const { col, row } = queens[i].pos

        if (col === newQueen.pos.col) {
          continue
        }

        if (row === newQueen.pos.row) {
          count++
          continue
        }

        if (
          Math.abs(row - newQueen.pos.row) === Math.abs(col - newQueen.pos.col)
        ) {
          count++
        }
      }

      newQueen.attackedBy = count

      return newQueen
    })

    return newQueens
  }

  const moveQueen = (queens: Array<Queen>, column: number): Array<Queen> => {
    var newQueens = queens.map((queen) => {
      const newQueen = { ...queen }
      if (newQueen.pos.col === column) {
        if (newQueen.pos.row + 1 === queens.length) {
          newQueen.pos.row = 0
        } else {
          newQueen.pos.row = newQueen.pos.row + 1
        }
      }

      return newQueen
    })

    newQueens = calculateAttackedBy(newQueens)

    return newQueens
  }

  const moveQueenToBestPosition = (
    queens: Array<Queen>,
    column: number,
    position: Position
  ): Array<Queen> => {
    const newQueens = queens.map((queen) => {
      const newQueen = { ...queen }
      if (queen.pos.col === column) {
        newQueen.pos = position
      }

      return newQueen
    })

    return newQueens
  }

  const delay = (delay: number) => {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay)
    })
  }

  const updateBoard = async (queens: Array<Queen>) => {
    setQueens(queens)
  }

  const execute = async () => {
    let queens = calculateAttackedBy(initialQueens)
    let totalQueensAttacked = queens.reduce(
      (acc, queen) => acc + queen.attackedBy,
      0
    )

    let column = 0

    let maxInteractions = 10

    while (totalQueensAttacked > 0 && maxInteractions > 0) {
      let bestPositionForQueen = queens[column].pos

      for (let i = 0; i < queens.length; i++) {
        queens = moveQueen(queens, column)

        updateBoard(queens)
        await delay(10)

        let newTotalQueensAttacked = queens.reduce(
          (acc, queen) => acc + queen.attackedBy,
          0
        )

        if (newTotalQueensAttacked <= totalQueensAttacked) {
          bestPositionForQueen = { ...queens[column].pos }
          totalQueensAttacked = newTotalQueensAttacked
        }
      }

      queens = moveQueenToBestPosition(queens, column, bestPositionForQueen)
      totalQueensAttacked = queens.reduce(
        (acc, queen) => acc + queen.attackedBy,
        0
      )

      column = column + 1
      if (column === queens.length) {
        column = 0
      }

      maxInteractions = maxInteractions - 1

      updateBoard(queens)
      await delay(10)
    }

    //console.log({ totalQueensAttacked, queens })
  }

  const value = useMemo(() => {
    return {
      execute,
    }
  }, [execute])

  return value
}
