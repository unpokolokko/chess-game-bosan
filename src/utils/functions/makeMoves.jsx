import { getPieceColor } from "../pieces/pieceIdentity";
import { getNonSlidingMoves, getSlidingMoves } from "./movementUtils";
import {
  ROOK_PIECE,
  BISHOP_PIECE,
  QUEEN_PIECE,
  KNIGHT_PIECE,
  KING_PIECE,
} from "../pieces/pieceDirections";

//sliding moves
export function calculateLegalMovesForRook(piece, row, col, board) {
  return getSlidingMoves(piece, row, col, board, ROOK_PIECE);
}

export function calculateLegalMovesForQueen(piece, row, col, board) {
  return getSlidingMoves(piece, row, col, board, QUEEN_PIECE);
}

export function calculateLegalMovesForBishop(piece, row, col, board) {
  return getSlidingMoves(piece, row, col, board, BISHOP_PIECE);
}

// non sliding moves
export function calculateLegalMovesForPawn(piece, row, col, board) {
  const moves = [];
  const pieceColor = getPieceColor(piece);
  const forwardMovement = pieceColor === "white" ? -1 : 1;
  const startingPointRow = pieceColor === "white" ? 6 : 1;
  const target = board[row + forwardMovement][col];

  //move forward only if there's no piece
  if (row + forwardMovement >= 0 && row + forwardMovement < 8 && !target) {
    moves.push({ row: row + forwardMovement, col: col });

    if (row === startingPointRow) {
      const firstTarget = board[row + 2 * forwardMovement][col];
      if (!firstTarget) {
        moves.push({ row: row + 2 * forwardMovement, col: col });
      }
    }
  }

  //diagonal movement
  for (const colMovement of [-1, 1]) {
    const targetRow = row + forwardMovement;
    const targetCol = col + colMovement;
    const diagonalTarget = board[targetRow][targetCol];
    const diagonalTargetColor = getPieceColor(target);

    if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      if (diagonalTarget && diagonalTargetColor !== pieceColor) {
        moves.push({ row: targetRow, col: targetCol });
      }
    }
  }

  return moves;
}

export function calculateLegalMovesForKing(piece, row, col, board) {
  // king has the same move as pawn except it can makan in all directions
  // const moves = [];
  // const pieceColor = getPieceColor(piece);

  /*for (const upwardBackwardMovement of [-1, 0, 1]) {
    const targetRow = row + upwardBackwardMovement;

    for (const leftRightMovement of [-1, 0, 1]) {
      const targetColumn = col + leftRightMovement;

      if (upwardBackwardMovement === 0 && leftRightMovement === 0) continue;
      if (
        targetRow >= 0 &&
        targetRow < 8 &&
        targetColumn >= 0 &&
        targetColumn < 8
      ) {
        const target = board[targetRow][targetColumn];

        if (!target) {
          moves.push({ row: targetRow, col: targetColumn });
        } else if (target && getPieceColor(target) !== pieceColor) {
          moves.push({ row: targetRow, col: targetColumn });
        }
      }
    }
  }*/

  /*for (const [dr, dc] of KING_PIECE) {
    let targetRow = row + dr;
    let targetCol = col + dc;

    if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      const target = board[targetRow][targetCol];

      if (!target) {
        moves.push({ row: targetRow, col: targetCol });
      } else if (target && getPieceColor(target) !== pieceColor) {
        moves.push({ row: targetRow, col: targetCol });
      }
    }
  }

  return moves;*/

  return getNonSlidingMoves(piece, row, col, board, KING_PIECE);
}

export function calculateLegalMovesForKnight(piece, row, col, board) {
  /*const moves = [];
  const pieceColor = getPieceColor(piece);

  for (const [dr, dc] of KNIGHT_PIECE) {
    let targetRow = row + dr;
    let targetCol = col + dc;

    if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      const target = board[targetRow][targetCol];

      if (!target) {
        moves.push({ row: targetRow, col: targetCol });
      } else if (target && getPieceColor(target) !== pieceColor) {
        moves.push({ row: targetRow, col: targetCol });
      }
    }
  }

  return moves;*/
  return getNonSlidingMoves(piece, row, col, board, KNIGHT_PIECE);
}
