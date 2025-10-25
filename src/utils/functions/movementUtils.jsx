import { getPieceColor } from "../pieces/pieceIdentity";

// queen, bishop, rook
export function getSlidingMoves(piece, row, col, board, directions) {
  const moves = [];

  for (const [dr, dc] of directions) {
    let targetRow = row + dr;
    let targetCol = col + dc;

    while (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      const target = board[targetRow][targetCol];

      if (!target) {
        moves.push({ row: targetRow, col: targetCol });
      } else {
        if (getPieceColor(target) !== getPieceColor(piece)) {
          moves.push({ row: targetRow, col: targetCol });
        }

        break;
      }

      targetRow += dr;
      targetCol += dc;
    }
  }

  return moves;
}

export function getNonSlidingMoves(piece, row, col, board, directions) {
  const moves = [];

  for (const [dr, dc] of directions) {
    let targetRow = row + dr;
    let targetCol = col + dc;

    if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      const target = board[targetRow][targetCol];

      if (!target) {
        moves.push({ row: targetRow, col: targetCol });
      } else if (target && getPieceColor(target) !== getPieceColor(piece)) {
        moves.push({ row: targetRow, col: targetCol });
      }
    }
  }

  return moves;
}
