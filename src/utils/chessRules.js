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

function pawnAttempt(lastMove, board, selectedPiece, curPos, targetPos) {
  const [fromRow, fromCol] = curPos; // current position of piece
  const [toRow, toCol] = targetPos; // target position of piece
  const direction = selectedPiece.color == COLORS.WHITE ? -1 : 1; // direction of pawn movement
  const startRow = selectedPiece.color == COLORS.WHITE ? 6 : 1; // starting row of pawn

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
  } else if (
    Math.abs(fromCol - toCol) == 1 &&
    board[toRow][toCol] == null &&
    lastMove &&
    lastMove.piece &&
    lastMove.piece.name == PIECES.PAWN &&
    lastMove.piece.color !== selectedPiece.color &&
    lastMove.doubleStep &&
    toRow == fromRow + direction &&
    toCol == lastMove.fromCol
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
  }
  const steps = Math.max(Math.abs(fromRow - toRow), Math.abs(fromCol - toCol));
  const rowStep = fromRow == toRow ? 0 : toRow > fromRow ? 1 : -1;
  const colStep = fromCol == toCol ? 0 : toCol > fromCol ? 1 : -1;

  for (let i = 1; i < steps; i++) {
    if (board[fromRow + rowStep * i][fromCol + colStep * i]) return false; // check if path blocked
  }
  if (
    !board[toRow][toCol] ||
    board[toRow][toCol].color !== selectedPiece.color
  ) {
    return true;
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
  }
  const rowStep = toRow > fromRow ? 1 : -1;
  const colStep = toCol > fromCol ? 1 : -1;
  const steps = Math.abs(fromRow - toRow);

  for (let i = 1; i < steps; i++) {
    if (board[fromRow + rowStep * i][fromCol + colStep * i]) return false; // check if path blocked
  }
  if (
    !board[toRow][toCol] ||
    board[toRow][toCol].color !== selectedPiece.color
  ) {
    return true;
  }

  return false;
}

function queenAttempt(board, selectedPiece, curPos, targetPos) {
  return (
    bishopAttempt(board, selectedPiece, curPos, targetPos) ||
    rookAttempt(board, selectedPiece, curPos, targetPos)
  );
}

function kingAttempt(board, selectedPiece, curPos, targetPos) {
  // TODO incomplete since need to add special rules for checks and checkmate
  const [fromRow, fromCol] = curPos;
  const [toRow, toCol] = targetPos;

  if (Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) {
    return (
      !board[toRow][toCol] || board[toRow][toCol].color !== selectedPiece.color
    );
  }

  return false;
}

export default function isLegalMove(
  lastMove,
  board,
  selectedPiece,
  curPos,
  targetPos
) {
  switch (selectedPiece.name) {
    case PIECES.PAWN:
      return pawnAttempt(lastMove, board, selectedPiece, curPos, targetPos);
    case PIECES.ROOK:
      return rookAttempt(board, selectedPiece, curPos, targetPos);
    case PIECES.KNIGHT:
      return knightAttempt(board, selectedPiece, curPos, targetPos);
    case PIECES.BISHOP:
      return bishopAttempt(board, selectedPiece, curPos, targetPos);
    case PIECES.QUEEN:
      return queenAttempt(board, selectedPiece, curPos, targetPos);
    case PIECES.KING:
      return kingAttempt(board, selectedPiece, curPos, targetPos);
    default:
      return false;
  }
}
