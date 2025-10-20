import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  calculateLegalMovesForRook,
  calculateLegalMovesForPawn,
  calculateLegalMovesForKing,
  calculateLegalMovesForQueen,
  calculateLegalMovesForBishop,
} from "../utils/legalMoves";
import { getPieceColor } from "../utils/pieceIdentity";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;
const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 80vmin;
  height: 80vmin;
  max-width: 600px;
  max-height: 600px;
  border: 1px solid #5b0734;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Square = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
    border: 0.5px solid #b7548a;
  background-color: ${(props) =>
    props.$isSelected
      ? "#990c58"
      : props.$isLegalMove
      ? "#a32468"
      : props.$isLight
      ? "#f4e6ee"
      : "#4c062c"};
]`;

const initialBoardSetup = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"], // 8
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"], // 7
  [null, null, null, null, null, null, null, null], // 6
  [null, null, null, null, null, null, null, null], // 5
  [null, null, null, null, null, null, null, null], // 4
  [null, null, null, null, null, null, null, null], // 3
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"], // 2
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"], // 1
];

export default function ChessBoard() {
  const [currentBoard, setCurrentBoard] = useState(initialBoardSetup);
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState("white");
  const [legalMoves, setLegalMoves] = useState([]);

  useEffect(() => {
    console.log("board updated");
  }, [currentBoard]);

  const getLegalMoves = (piece, row, col, board) => {
    console.log("piece", piece);

    //rook
    if (piece === "♜" || piece === "♖") {
      return calculateLegalMovesForRook(piece, row, col, board);
    }

    //pawn
    if (piece === "♟" || piece === "♙") {
      return calculateLegalMovesForPawn(piece, row, col, board);
    }

    //king
    if (piece === "♚" || piece === "♔") {
      return calculateLegalMovesForKing(piece, row, col, board);
    }

    //queen
    if (piece === "♛" || piece === "♕") {
      return calculateLegalMovesForQueen(piece, row, col, board);
    }

    //bishop
    if (piece === "♝" || piece === "♗") {
      return calculateLegalMovesForBishop(piece, row, col, board);
    }
  };

  const checkForLegalMovement = (row, col) => {
    let legit = true;
    const piece = currentBoard[selected.row][selected.col];

    if (piece === "♜" || piece === "♖") {
      legit = legalMoves.some((m) => m.row === row && m.col === col);
    }

    if (piece === "♟" || piece === "♙") {
      legit = legalMoves.some((m) => m.row === row && m.col === col);
    }

    if (piece === "♚" || piece === "♔") {
      legit = legalMoves.some((m) => m.row === row && m.col === col);
    }

    if (piece === "♛" || piece === "♕") {
      legit = legalMoves.some((m) => m.row === row && m.col === col);
    }

    if (piece === "♝" || piece === "♗") {
      legit = legalMoves.some((m) => m.row === row && m.col === col);
    }

    return legit;
  };

  const handleChessMovement = (row, col) => {
    const selectedPiece = currentBoard[row][col];

    const currentPieceColor = getPieceColor(selectedPiece);
    // true - white
    // false - black

    if (selected && selected.row === row && selected.col === col) {
      //drop it if we select same space again
      setLegalMoves([]);
      setSelected(null);
    } else if (selected && (!currentPieceColor || currentPieceColor !== turn)) {
      // move pieces, only allow to move to empty space or opponent's piece

      //check piece movement
      console.log("--- checking if move made is legal ---");
      const isLegal = checkForLegalMovement(row, col);
      if (!isLegal) return;
      const newBoard = currentBoard.map((r) => [...r]);
      newBoard[row][col] = currentBoard[selected.row][selected.col];
      newBoard[selected.row][selected.col] = null;
      setCurrentBoard(newBoard);
      setSelected(null);
      setLegalMoves([]);
      setTurn((prev) => (prev === "white" ? "black" : "white"));
    } else if (
      selected === null &&
      selectedPiece &&
      currentPieceColor === turn
    ) {
      //select piece - only allow to select own piece
      //retrieve the legal moves by selected piece
      if (selectedPiece === "♜" || selectedPiece === "♖") {
        console.log("--- retrieving legal possible moves for rook ---");
        setLegalMoves(getLegalMoves(selectedPiece, row, col, currentBoard));
      }
      if (selectedPiece === "♟" || selectedPiece === "♙") {
        console.log("--- retrieving legal possible moves for pawn ---");
        setLegalMoves(getLegalMoves(selectedPiece, row, col, currentBoard));
      }
      if (selectedPiece === "♚" || selectedPiece === "♔") {
        console.log("--- retrieving legal possible moves for king ---");
        setLegalMoves(getLegalMoves(selectedPiece, row, col, currentBoard));
      }
      if (selectedPiece === "♛" || selectedPiece === "♕") {
        console.log("--- retrieving legal possible moves for queen ---");
        setLegalMoves(getLegalMoves(selectedPiece, row, col, currentBoard));
      }
      if (selectedPiece === "♝" || selectedPiece === "♗") {
        console.log("--- retrieving legal possible moves for bishop ---");
        setLegalMoves(getLegalMoves(selectedPiece, row, col, currentBoard));
      }

      setSelected({ row, col });
    }
  };

  const renderBoard = () => {
    const squares = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const whitesquare = (row + col) % 2 === 0;
        const piece = currentBoard[row][col];
        const isSelected =
          selected && selected.row === row && selected.col === col;
        const isLegalMove = legalMoves.some(
          (move) => move.row === row && move.col === col
        );

        squares.push(
          <Square
            key={`${row}-${col}`}
            $isLight={whitesquare}
            $isSelected={isSelected}
            $isLegalMove={isLegalMove}
            onClick={() => handleChessMovement(row, col)}
          >
            {piece}
          </Square>
        );
      }
    }
    return squares;
  };

  return (
    <PageWrapper>
      <BoardWrapper>{renderBoard()}</BoardWrapper>
    </PageWrapper>
  );
}
