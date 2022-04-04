export type Position = {
  col: number
  row: number
}

export type Square = {
  pos: Position
}

export type Queen = {
  pos: Position
  attackedBy: number
}
