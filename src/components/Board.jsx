import React, { useState } from "react";
import Square from "./Square";
import isLegalMove from "../utils/chessRules";

const PIECES = {
  PAWN: "pawn",
  ROOK: "rook",
  KNIGHT: "knight",
  BISHOP: "bishop",
  QUEEN: "queen",
  KING: "king",
};
const COLORS = {
  WHITE: "white",
  BLACK: "black",
};

function createPiece(name, color) {
  const piece = { name, color };
  return piece;
}

function getInitialBoard() {
  const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  const pieceOrder = [
    PIECES.ROOK,
    PIECES.KNIGHT,
    PIECES.BISHOP,
    PIECES.QUEEN,
    PIECES.KING,
    PIECES.BISHOP,
    PIECES.KNIGHT,
    PIECES.ROOK,
  ];

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 8; j++) {
      const row = i == 0 ? 0 : 7;
      const color = i == 0 ? COLORS.BLACK : COLORS.WHITE;
      const pawnRow = color == COLORS.BLACK ? 1 : 6;
      board[row][j] = createPiece(pieceOrder[j], color);
      board[pawnRow][j] = createPiece(PIECES.PAWN, color);
    }
  }

  return board;
}

export default function Board() {
  const [board, setBoard] = useState(getInitialBoard); // board state
  const [selected, setSelected] = useState(null); // selected piece state
  const [turn, setTurn] = useState(COLORS.WHITE); // turn state
  const [moveHistory, setMoveHistory] = useState([]); // last move info including pawn doubleStep

  // move function
  function executeMove(selected, row, col) {
    const newBoard = board.map((row) => row.slice()); // create temp new board
    const lastMove = moveHistory[moveHistory.length - 1];

    newBoard[row][col] = selected.piece; //
    newBoard[selected.row][selected.col] = null;

    const isEnPassant =
      selected.piece.name == PIECES.PAWN &&
      Math.abs(selected.col - col) == 1 &&
      board[row][col] == null &&
      lastMove &&
      lastMove.piece &&
      lastMove.piece.name == PIECES.PAWN &&
      lastMove.piece.color !== selected.piece.color &&
      lastMove.doubleStep &&
      lastMove.toRow == row + (selected.piece.color == COLORS.WHITE ? 1 : -1) &&
      lastMove.toCol == col;

    if (isEnPassant) {
      newBoard[selected.row][col] = null;
    }

    return newBoard;
  }

  // when you click a square, you get the row and column of the square
  function handleSquareClick(row, col) {
    // first checking if a piece is selected, to then attempt a move
    console.log(lastMove);

    // first we check if the selected state is true (if a piece is already selected)
    if (
      // check if we have a piece selected
      selected &&
      // check if selected piece is the color of which turn it is
      selected.piece.color == turn &&
      // if a piece is already selected, we check if the new square we clicked is a legal move
      // for the piece that we have selected
      isLegalMove(
        moveHistory[moveHistory.length - 1], // lastMove state
        board, // board state
        selected.piece, // selectedPiece
        [selected.row, selected.col], // curPos
        [row, col] // targetPos
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
            selected.piece.name == PIECES.PAWN &&
            Math.abs(selected.row - row) == 2,
        },
      ]);

      setBoard(executeMove(selected, row, col)); // update board with newBoard from executeMove()
      setSelected(null); // deselect everything
      setTurn(turn == COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE); // toggle turn
    } else if (
      board[row][col] &&
      (!selected || board[selected.row][selected.col] !== board[row][col])
    ) {
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
