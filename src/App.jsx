import { Board, MoveHistory } from "./components/index.jsx";
import { getInitialBoard } from "./components/Board.jsx";
import { isInCheck, isCheckmate } from "./utils/chessRules.js";
import React, { useState, useEffect } from "react";

export default function App() {
	const [moveHistory, setMoveHistory] = useState([]);
	const [board, setBoard] = useState(getInitialBoard);
	const [turn, setTurn] = useState("white");
	const [curMoveIndex, setCurMoveIndex] = useState(-1);
	const [inCheck, setInCheck] = useState(false);
	const [isCheckmated, setIsCheckmated] = useState(false);
	const [showCheckAlert, setShowCheckAlert] = useState(false);
	const [showCheckmateModal, setShowCheckmateModal] = useState(false);
	const [winner, setWinner] = useState(null);

	useEffect(() => {
		const checkStatus = isInCheck(board, turn);
		const wasInCheck = inCheck;
		const checkmateStatus = checkStatus && isCheckmate(board, turn);

		setInCheck(checkStatus);
		setIsCheckmated(checkStatus && isCheckmate(board, turn));

		if (
			checkStatus &&
			!wasInCheck &&
			!(checkStatus && isCheckmate(board, turn))
		) {
			setShowCheckAlert(true);
			setTimeout(() => setShowCheckAlert(false), 2000);
		}

		if (checkmateStatus && !showCheckmateModal) {
			const winningPlayer = turn === "white" ? "Black" : "White";
			setWinner(winningPlayer);
			setTimeout(() => setShowCheckmateModal(true), 500);
		}
	}, [board, turn]);

	function handleNewGame() {
		setBoard(getInitialBoard());
		setTurn("white");
		setMoveHistory([]);
		setCurMoveIndex(-1);
		setInCheck(false);
		setIsCheckmated(false);
		setShowCheckmateModal(false);
		setShowCheckAlert(false);
		setWinner(null);
	}

	return (
		<>
			<div className="grid grid-cols-[1fr_400px_1fr] grid-rows-[1fr_400px_1fr] min-h-screen">
				<div></div>
				<div className="flex justify-center col-2 row-2 content-center items-center">
					{showCheckAlert && (
						<div className="check-alert">
							<div className="check-alert-text">Check!</div>
						</div>
					)}
					{showCheckmateModal && (
						<div className="checkmate-modal-overlay">
							<div className="checkmate-modal">
								<h2 className="checkmate-title">Checkmate!</h2>
								<p className="checkmate-winner">{winner} wins!</p>
								<button onClick={handleNewGame} className="new-game-button">
									New Game
								</button>
							</div>
						</div>
					)}
					<Board
						board={board}
						setBoard={setBoard}
						moveHistory={moveHistory}
						setMoveHistory={setMoveHistory}
						setTurn={setTurn}
						turn={turn}
						curMoveIndex={curMoveIndex}
						setCurMoveIndex={setCurMoveIndex}
						inCheck={inCheck}
						isCheckmated={isCheckmated}
					/>
				</div>
				<div className="grid grid-cols-2 col-3 row-2">
					<div className="flex pl-4">
						<MoveHistory
							moveHistory={moveHistory}
							setBoard={setBoard}
							setTurn={setTurn}
							setCurMoveIndex={setCurMoveIndex}
						/>
					</div>
					<div></div>
				</div>
			</div>
		</>
	);
}
