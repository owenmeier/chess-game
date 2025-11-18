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

	// if not castling (only moving 1 space)
	if (Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) {
		return (
			!board[toRow][toCol] || board[toRow][toCol].color !== selectedPiece.color
		);
	}

	// castling (moving 2 squares) adding this to commit and close issue
	if (
		!selectedPiece.hasMoved &&
		fromRow == toRow &&
		Math.abs(fromCol - toCol) == 2
	) {
		const isKingSide = toCol > fromCol;
		const rookCol = isKingSide ? 7 : 0;
		const rook = board[fromRow][rookCol];

		if (
			!rook ||
			rook.name !== PIECES.ROOK ||
			rook.color !== selectedPiece.color ||
			rook.hasMoved
		) {
			return false;
		}

		const start = Math.min(fromCol, rookCol) + 1;
		const end = Math.max(fromCol, rookCol);
		for (let col = start; col < end; col++) {
			if (board[fromRow][col]) {
				return false;
			}
		}

		const enemyColor =
			selectedPiece.color === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
		if (isSquareAttacked(board, fromRow, fromCol, enemyColor)) {
			return false;
		}

		const intermediateCol = isKingSide ? fromCol + 1 : fromCol - 1;
		if (isSquareAttacked(board, fromRow, intermediateCol, enemyColor)) {
			return false;
		}

		return true;
	}

	return false;
}

export function findKing(board, color) {
	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
			const piece = board[row][col];
			if (piece && piece.name === PIECES.KING && piece.color === color) {
				return [row, col];
			}
		}
	}
	return null; // shouldn't reach here
}

export function isSquareAttacked(board, row, col, attackingColor) {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const piece = board[r][c];
			if (piece && piece.color === attackingColor) {
				if (piece.name === PIECES.PAWN) {
					const direction = piece.color === COLORS.WHITE ? -1 : 1;
					if (r + direction === row && Math.abs(c - col) === 1) {
						return true;
					}
				} else {
					if (isLegalMove(null, board, piece, [r, c], [row, col])) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

export function isInCheck(board, color) {
	const kingPos = findKing(board, color);
	if (!kingPos) return false;

	const enemyColor = color === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
	return isSquareAttacked(board, kingPos[0], kingPos[1], enemyColor);
}

export function wouldBeInCheck(board, selectedPiece, fromPos, toPos, color) {
	const tempBoard = board.map((row) => row.slice());
	const [fromRow, fromCol] = fromPos;
	const [toRow, toCol] = toPos;

	tempBoard[toRow][toCol] = selectedPiece;
	tempBoard[fromRow][fromCol] = null;

	const lastMove = null;
	if (
		selectedPiece.name === PIECES.PAWN &&
		Math.abs(fromCol - toCol) === 1 &&
		!board[toRow][toCol]
	) {
		const capturedPawnRow =
			toRow + (selectedPiece.color === COLORS.WHITE ? 1 : -1);
		tempBoard[capturedPawnRow][toCol] = null;
	}
	return isInCheck(tempBoard, color);
}

export function isCheckmate(board, color) {
	if (!isInCheck(board, color)) {
		return false;
	}

	for (let fromRow = 0; fromRow < 8; fromRow++) {
		for (let fromCol = 0; fromCol < 8; fromCol++) {
			const piece = board[fromRow][fromCol];
			if (piece && piece.color === color) {
				for (let toRow = 0; toRow < 8; toRow++) {
					for (let toCol = 0; toCol < 8; toCol++) {
						if (
							isLegalMove(
								null,
								board,
								piece,
								[fromRow, fromCol],
								[toRow, toCol]
							)
						) {
							if (
								!wouldBeInCheck(
									board,
									piece,
									[fromRow, fromCol],
									[toRow, toCol],
									color
								)
							) {
								return false;
							}
						}
					}
				}
			}
		}
	}
	return true; // no legal moves found, checkmate
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
