import React, { useState } from "react";

function pawnAttempt(board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos; // current position of piece
  const [toRow, toCol] = targetPos; // target position of piece

  const direction = selectedPiece.color == "white" ? -1 : 1;
  const startRow = selectedPiece.color == "white" ? 6 : 1;

  if (
    // single move
    toCol == fromCol &&
    fromRow + direction == toRow &&
    !board[toRow][toCol]
  ) {
    return true;
  } else if (
    // double move on first move
    fromRow == startRow &&
    toCol == fromCol &&
    fromRow + 2 * direction == toRow &&
    !board[fromRow + direction][fromCol] &&
    !board[toRow][toCol]
  ) {
    return true;
  } else if (
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

  // making sure that rook is only moving in straight lines
  if (fromRow !== toRow && fromCol !== toCol) {
    return false;
  } else {
    const numSpaces = Math.max(
      Math.abs(fromRow - toRow),
      Math.abs(fromCol - toCol)
    );
    const rowStep = fromRow == toRow ? 0 : toRow > fromRow ? 1 : -1;
    const colStep = fromCol == toCol ? 0 : toCol > fromCol ? 1 : -1;
    console.log(numSpaces);

    for (let i = 1; i < numSpaces; i++) {
      console.log(i);
      if (board[fromRow + rowStep * i][fromCol + colStep * i]) {
        // check if path is blocked
        return false;
      }
    }
    if (
      board[toRow][toCol] ==
        board[fromRow + numSpaces * rowStep][fromCol + numSpaces * colStep] &&
      board[toRow][toCol].color !== selectedPiece.color
    ) {
      return true;
    }
  }

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
