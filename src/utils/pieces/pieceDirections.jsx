export const ROOK_PIECE = [
  [1, 0], //down
  [-1, 0], //up
  [0, 1], //right
  [0, -1], //left
];
export const KNIGHT_PIECE = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];
export const BISHOP_PIECE = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];
export const QUEEN_PIECE = [...BISHOP_PIECE, ...ROOK_PIECE];

export const KING_PIECE = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

/*king & pawn handles separately*/
