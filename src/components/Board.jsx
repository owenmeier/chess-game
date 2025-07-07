import React from "react";
import Square from "./Square";
import Piece from "./Piece";

// id syntax:
// leading digit is type of piece (rook, bishop, knight etc) defined by value of piece
// i.e. rooks are worth 5 points, knights 3, bishops 3, etc
// for the purpose of this syntax knights will be worth 3 and bishops 4
// second digit will be which # of each piece the piece is (rooks 1 and 2, pawns 1-8)
// final digit will be piece color, 1 for black 2 for white
function createPiece(name, color, id) {
  const piece = { name, color, id };
  return piece;
}

const board = Array.from({ length: 8 }, (_, row) =>
  Array.from({ length: 8 }, (_, col) => null)
);

function setupBoard() {
  board[0][0] = createPiece("rook", "black", 510);
}

setupBoard();

export default function Board() {
  return (
    <div>
      {board.map((rowArr, i) => (
        <div className="flex" key={i}>
          {rowArr.map((piece, j) => (
            <Square key={`${i}.${j}`} row={i} col={j} piece={piece} />
          ))}
        </div>
      ))}
    </div>
  );
}
