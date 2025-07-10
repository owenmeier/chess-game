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
  const [moveHistory, setMoveHistory] = useState([]);

  // move function
  function executeMove(selected, row, col) {
    const newBoard = board.map((row) => row.slice()); // create temp new board
    const lastMove = moveHistory[moveHistory.length - 1];

    newBoard[row][col] = selected.piece; //
    newBoard[selected.row][selected.col] = null;

    const isEnPassant =
      selected.piece.name === "pawn" &&
      Math.abs(selected.col - col) === 1 &&
      board[row][col] == null &&
      lastMove &&
      lastMove.piece &&
      lastMove.piece.name === "pawn" &&
      lastMove.piece.color !== selected.piece.color &&
      lastMove.doubleStep &&
      lastMove.toRow === row + (selected.piece.color === "white" ? 1 : -1) &&
      lastMove.toCol === col;

    if (isEnPassant) {
      newBoard[selected.row][col] = null;
    }

    return newBoard;
  }

  function toggleTurn(currentTurn) {
    return currentTurn == "white" ? "black" : "white";
  }

  function handleSquareClick(row, col) {
    // first checking if a piece is selected, to then attempt a move
    if (
      selected &&
      selected.piece.color == turn &&
      isLegalMove(
        moveHistory[moveHistory.length - 1],
        board,
        selected.piece,
        [selected.row, selected.col],
        [row, col]
      )
    ) {
      setMoveHistory([
        ...moveHistory,
        {
          piece: selected.piece,
          fromRow: selected.row,
          fromCol: selected.col,
          toRow: row,
          toCol: col,
          doubleStep:
            selected.piece.name == "pawn" && Math.abs(selected.row - row) == 2,
        },
      ]);

      setBoard(executeMove(selected, row, col)); // update board with newBoard from executeMove()
      setSelected(null); // deselect everything
      setTurn(toggleTurn(currentTurn)); // toggle turn
    } else if (board[row][col]) {
      setSelected({ row, col, piece: board[row][col] }); // if piece, select it
    } else {
      setSelected(null); // otherwise, deselect everything
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
