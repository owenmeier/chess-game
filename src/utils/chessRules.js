import React, { useState } from "react";

function pawnAttempt(board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  if (selectedPiece.color == "white") {
    if (
      !board[fromRow - 1][fromCol] &&
      toRow == fromRow - 1 &&
      toCol == fromCol
    ) {
      return true;
    }
  }
  return false;
}

function rookAttempt(board, selectedPiece, curPos, targetPos) {}

function knightAttempt(board, selectedPiece, curPos, targetPos) {}

function bishopAttempt(board, selectedPiece, curPos, targetPos) {}

function queenAttempt(board, selectedPiece, curPos, targetPos) {}

function kingAttempt(board, selectedPiece, curPos, targetPos) {}

export default function isLegalMove(board, selectedPiece, curPos, targetPos) {
  switch (selectedPiece.name) {
    case "pawn":
      return pawnAttempt(board, selectedPiece, curPos, targetPos);
    case "rook":
      return rookAttempt(board, selectedPiece, curPos, targetPos);
    case "knight":
      return knightAttempt(board, selectedPiece, curPos, targetPos);
    case "bishop":
      return bishopAttempt(board, selectedPiece, curPos, targetPos);
    case "queen":
      return queenAttempt(board, selectedPiece, curPos, targetPos);
    case "king":
      return kingAttempt(board, selectedPiece, curPos, targetPos);
    default:
      return false;
  }
}
