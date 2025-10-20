import { getPieceColor } from "./pieceIdentity";
export function calculateLegalMovesForRook(piece, row, col, board) {
  const moves = [];
  const pieceColor = getPieceColor(piece);

  if (!piece) return moves;

  const directions = [
    [1, 0], //down
    [-1, 0], //up
    [0, 1], //right
    [0, -1], //left
  ];

  directions.forEach(([dr, dc]) => {
    let currentRow = row + dr;
    let currentCol = col + dc;

    while (
      currentRow >= 0 &&
      currentRow < 8 &&
      currentCol >= 0 &&
      currentCol < 8
    ) {
      const target = board[currentRow][currentCol];
      const targetColor = getPieceColor(target);

      if (!target) {
        moves.push({ row: currentRow, col: currentCol });
      } else {
        if (targetColor !== pieceColor) {
          moves.push({ row: currentRow, col: currentCol });
        }

        break;
      }

      currentRow += dr;
      currentCol += dc;
    }
  });

  return moves;
}

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
  const moves = [];
  const pieceColor = getPieceColor(piece);

  for (const upwardBackwardMovement of [-1, 0, 1]) {
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
  }

  return moves;
}

export function calculateLegalMovesForQueen(piece, row, col, board) {
  // list of directions allowed for queen
  const moves = [];
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

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

export function calculateLegalMovesForBishop(piece, row, col, board) {
  const moves = [];
  const directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (const [dr, dc] of directions) {
    let targetRow = dr + row;
    let targetCol = dc + col;

    while (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      const target = board[targetRow][targetCol];

      if (!target) {
        moves.push({ row: targetRow, col: targetCol });
      } else if (target) {
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

export function calculateLegalMovesForKnight(piece, row, col, board) {}
