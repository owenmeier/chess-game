import React from "react";
import BlaBishop from "../images/BlaBish.png";
import BlaKing from "../images/BlaKing.png";
import BlaKnight from "../images/BlaKnight.png";
import BlaRook from "../images/BlaRook.png";
import BlaQueen from "../images/BlaQueen.png";
import BlaPawn from "../images/BlaPawn.png";
import WhiBishop from "../images/WhiBish.png";
import WhiKing from "../images/WhiKing.png";
import WhiKnight from "../images/WhiKnight.png";
import WhiRook from "../images/WhiRook.png";
import WhiQueen from "../images/WhiQueen.png";
import WhiPawn from "../images/WhiPawn.png";

const pieceImages = {
  white: {
    Queen: WhiQueen,
    King: WhiKing,
    Rook: WhiRook,
    Bishop: WhiBishop,
    Knight: WhiKnight,
    Pawn: WhiPawn,
  },
  black: {
    Queen: BlaQueen,
    King: BlaKing,
    Rook: BlaRook,
    Bishop: BlaBishop,
    Knight: BlaKnight,
    Pawn: BlaPawn,
  },
};

export default function Piece({ name, color, id }) {
  const nameString = name.charAt(0).toUpperCase() + name.slice(1);
  const imgSrc = pieceImages[color][nameString];

  return <img src={imgSrc} alt={`${color} ${name}`}></img>;
}
