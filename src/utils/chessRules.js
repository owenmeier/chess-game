import React, { useState } from "react";

function pawnAttempt(board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  const direction = selectedPiece.color == "white" ? -1 : 1;
  const startRow = selectedPiece.color == "white" ? 6 : 1;

  if (
    // single move
    toCol == fromCol &&
    fromRow + direction == toRow &&
    !board[toRow][toCol]
  ) {
    return true;
  }

  if (
    // double move on first move
    fromRow == startRow &&
    toCol == fromCol &&
    fromRow + 2 * direction == toRow &&
    !board[fromRow + direction][fromCol] &&
    !board[toRow][toCol]
  ) {
    return true;
  }

  if (
    // capture enemy piece
    Math.abs(fromCol - toCol) == 1 &&
    toRow == fromRow + direction &&
    board[toRow][toCol] &&
    board[toRow][toCol].color !== selectedPiece.color
  ) {
    return true;
  }

  return false;
}

function rookAttempt(board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  return false;
}

function knightAttempt(board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  return false;
}

function bishopAttempt(board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  return false;
}

function queenAttempt(board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  return false;
}

function kingAttempt(board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  return false;
}

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
