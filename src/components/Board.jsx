import React, { useState } from "react";
import Square from "./Square";
import isLegalMove from "../utils/chessRules";

// id syntax:
// leading digit is type of piece (rook, bishop, knight etc) defined by value of piece
// i.e. rooks are worth 5 points, knights 3, bishops 3, etc
// for the purpose of this syntax knights will be worth 3 and bishops 4, king will be 7
// second digit will be which # of each piece the piece is (rooks 1 and 2, pawns 1-8)
// final digit will be piece color, 1 for black 2 for white
function createPiece(name, color, id) {
  const piece = { name, color, id };
  return piece;
}

function getInitialBoard() {
  const board = Array.from({ length: 8 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => null)
  );

  {
    // black pieces
    board[0][0] = createPiece("rook", "black", 510);
    board[0][1] = createPiece("knight", "black", 310);
    board[0][2] = createPiece("bishop", "black", 410);
    board[0][3] = createPiece("queen", "black", 910);
    board[0][4] = createPiece("king", "black", 710);
    board[0][5] = createPiece("bishop", "black", 420);
    board[0][6] = createPiece("knight", "black", 320);
    board[0][7] = createPiece("rook", "black", 520);
    for (let col = 0; col < 8; col++) {
      board[1][col] = createPiece("pawn", "black", 110 + col);
    }
  }

  {
    // white pieces
    board[7][0] = createPiece("rook", "white", 511);
    board[7][1] = createPiece("knight", "white", 311);
    board[7][2] = createPiece("bishop", "white", 411);
    board[7][3] = createPiece("queen", "white", 911);
    board[7][4] = createPiece("king", "white", 711);
    board[7][5] = createPiece("bishop", "white", 421);
    board[7][6] = createPiece("knight", "white", 321);
    board[7][7] = createPiece("rook", "white", 521);
    for (let col = 0; col < 8; col++) {
      board[6][col] = createPiece("pawn", "white", 110 + col);
    }
  }

  return board;
}

export default function Board() {
  const [board, setBoard] = useState(getInitialBoard); // board state
  const [selected, setSelected] = useState(null); // selected piece state
  const [turn, setTurn] = useState("white"); // turn state
  const [lastMove, setLastMove] = useState(null); // last move info including pawn doubleStep

  // if piece exists, assign piece to grabbedpiece
  // if piece is grabbed, next click should move piece to board spot

  // when you click a square, you get the row and column of the square
  function handleSquareClick(row, col) {
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
        lastMove, // lastMove state
        board, // board state
        selected.piece, // selectedPiece
        [selected.row, selected.col], // curPos
        [row, col] // targetPos
      )
    ) {
      // if piece move was legal, we log new last move as this move and pass it to isLegalMove
      setLastMove({
        piece: selected.piece, // lastMove.piece
        color: selected.piece.color, // lastMove.color
        fromRow: selected.row, // lastMove.fromRow
        fromCol: selected.col, // lastMove.fromCol
        toRow: row, // lastMove.toRow
        toCol: col, // lastMove.toCol
        // lastMove.doubleStep ? true : false
        doubleStep:
          selected.piece.name == "pawn" && Math.abs(selected.row - row) == 2,
      });

      // create new board variable that we can modify
      const newBoard = board.map((row) => row.slice());
      const tempPiece = selected; // we duplicate selected piece

      newBoard[row][col] = selected.piece; // assign piece to target square on new board
      newBoard[tempPiece.row][tempPiece.col] = null; // empty out piece's previous square

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

      setBoard(newBoard); // re-render board as newBoard
      setSelected(null); // deselect piece after board has updated
      setTurn(turn === "white" ? "black" : "white"); // update turn
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
