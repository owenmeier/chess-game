import React, { useState } from "react";
import Square from "./Square";

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
  return (
    <div>
      {board.map((rowArr, i) => (
        <div className="flex" key={i}>
          {rowArr.map((piece, j) => (
            <Square key={`${i}${j}`} row={i} col={j} piece={piece} />
          ))}
        </div>
      ))}
    </div>
  );
}
