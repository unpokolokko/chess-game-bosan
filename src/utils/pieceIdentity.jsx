export function getPieceColor(currentPiece) {
  const whitePieces = ["♖", "♘", "♗", "♕", "♔", "♙"];
  return !currentPiece
    ? null
    : whitePieces.includes(currentPiece)
    ? "white"
    : "black";
}
