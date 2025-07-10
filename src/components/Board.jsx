import React, { useState } from "react";
import Square from "./Square";
import isLegalMove from "../utils/chessRules";

function createPiece(name, color) {
  const piece = { name, color };
  return piece;
}

function getInitialBoard() {
  const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  const pieceOrder = [
    "rook",
    "knight",
    "bishop",
    "queen",
    "king",
    "bishop",
    "knight",
    "rook",
  ];

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 8; j++) {
      const row = i == 0 ? 0 : 7;
      const color = i == 0 ? "black" : "white";
      const pawnRow = color == "black" ? 1 : 6;
      board[row][j] = createPiece(pieceOrder[j], color);
      board[pawnRow][j] = createPiece("pawn", color);
    }
  }

  return board;
}

export default function Board() {
  const [board, setBoard] = useState(getInitialBoard); // board state
  const [selected, setSelected] = useState(null); // selected piece state
  const [turn, setTurn] = useState("white"); // turn state
  const [lastMove, setLastMove] = useState(null);

  // if piece exists, assign piece to grabbedpiece
  // if piece is grabbed, next click should move piece to board spot

  function handleSquareClick(row, col) {
    if (
      selected &&
      selected.piece.color == turn &&
      isLegalMove(
        lastMove,
        board,
        selected.piece,
        [selected.row, selected.col],
        [row, col]
      )
    ) {
      setLastMove({
        piece: selected.piece,
        color: selected.piece.color,
        fromRow: selected.row,
        fromCol: selected.col,
        doubleStep:
          selected.piece.name == "pawn" && Math.abs(selected.row - row) == 2,
      });
      const newBoard = board.map((row) => row.slice());
      const tempPiece = selected;
      newBoard[row][col] = selected.piece;
      newBoard[tempPiece.row][tempPiece.col] = null;
      setBoard(newBoard);
      setSelected(null);
      setTurn(turn === "white" ? "black" : "white");
    } else if (!selected && board[row][col]) {
      setSelected({ row, col, piece: board[row][col] });
    } else if (selected && selected.row == row && selected.col == col) {
      setSelected(null);
    } else if (!board[row][col]) {
      setSelected(null);
    } else {
      setSelected({ row, col, piece: board[row][col] });
    }
  }

  return (
    <div>
      {board.map((rowArr, i) => (
        <div className="flex" key={i}>
          {rowArr.map((piece, j) => (
            <Square
              key={`${i}${j}`}
              row={i}
              col={j}
              piece={piece}
              onClick={() => handleSquareClick(i, j)}
              highlighted={selected && selected.row == i && selected.col == j}
            />
          ))}
        </div>
      ))}
      <div>{turn}'s turn.</div>
    </div>
  );
}
