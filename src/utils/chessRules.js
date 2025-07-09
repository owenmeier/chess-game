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
    const steps = Math.max(
      Math.abs(fromRow - toRow),
      Math.abs(fromCol - toCol)
    );
    const rowStep = fromRow == toRow ? 0 : toRow > fromRow ? 1 : -1;
    const colStep = fromCol == toCol ? 0 : toCol > fromCol ? 1 : -1;
    // console.log(steps);

    for (let i = 1; i < steps; i++) {
      // console.log(i);
      if (board[fromRow + rowStep * i][fromCol + colStep * i]) return false; // check if path blocked
    }
    if (
      !board[toRow][toCol] ||
      (board[toRow][toCol] ==
        board[fromRow + steps * rowStep][fromCol + steps * colStep] &&
        board[toRow][toCol].color !== selectedPiece.color)
    ) {
      return true;
    }
  }

  return false;
}

function knightAttempt(board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  if (
    (Math.abs(fromRow - toRow) == 2 && Math.abs(fromCol - toCol) == 1) ||
    (Math.abs(fromCol - toCol) == 2 && Math.abs(fromRow - toRow) == 1)
  ) {
    if (
      !board[toRow][toCol] ||
      board[toRow][toCol].color !== selectedPiece.color
    ) {
      return true;
    }
  }

  return false;
}

function bishopAttempt(board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  // making sure bishop is moving exactly diagonally (row and col must change same amount)
  if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) {
    return false;
  } else {
    const rowStep = toRow > fromRow ? 1 : -1;
    const colStep = toCol > fromCol ? 1 : -1;
    const steps = Math.abs(fromRow - toRow);

    for (let i = 1; i < steps; i++) {
      if (board[fromRow + rowStep * i][fromCol + colStep * i]) return false; // check if path blocked
    }
    if (
      !board[toRow][toCol] ||
      (board[toRow][toCol] ==
        board[fromRow + rowStep * steps][fromCol + colStep * steps] &&
        board[toRow][toCol].color !== selectedPiece.color)
    ) {
      return true;
    }
  }

  return false;
}

function queenAttempt(board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  if (Math.abs(fromRow - toRow) == Math.abs(fromCol - toCol)) {
    return bishopAttempt(board, selectedPiece, curPos, targetPos);
  }
  if (
    (fromRow == toRow || fromCol == toCol) &&
    !(fromRow !== toRow && fromCol !== toCol)
  ) {
    return rookAttempt(board, selectedPiece, curPos, targetPos);
  }

  return false;
}

function kingAttempt(board, selectedPiece, curPos, targetPos) {
  // TODO incomplete since need to add special rules for checks and checkmate
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  if (Math.abs(fromRow - toRow) == 1 || Math.abs(fromCol - toCol) == 1) {
    if (Math.abs(fromRow - toRow) == Math.abs(fromCol - toCol)) {
      return bishopAttempt(board, selectedPiece, curPos, targetPos);
    }
    if (
      (fromRow == toRow || fromCol == toCol) &&
      !(fromRow !== toRow && fromCol !== toCol)
    ) {
      return rookAttempt(board, selectedPiece, curPos, targetPos);
    }
  }

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
