import React from "react";

const notations = {
	pawn: "",
	rook: "R",
	knight: "N",
	bishop: "B",
	queen: "Q",
	king: "K",
};

const cols = {
	0: "a",
	1: "b",
	2: "c",
	3: "d",
	4: "e",
	5: "f",
	6: "g",
	7: "h",
};

const rows = {
	0: "8",
	1: "7",
	2: "6",
	3: "5",
	4: "4",
	5: "3",
	6: "2",
	7: "1",
};

export default function MoveHistory({
	moveHistory,
	setBoard,
	setTurn,
	setCurMoveIndex,
}) {
	console.log(moveHistory);

	function handleClick(pairIndex, moveIndex) {
		const actualIndex = pairIndex * 2 + moveIndex;
		setBoard(moveHistory[actualIndex].board);
		setTurn(moveHistory[actualIndex].turn == "black" ? "white" : "black");
		setCurMoveIndex(actualIndex);
	}

	function getMoveNotation(move) {
		let notation = "";

		if (
			// castling verification
			move.piece.name === "king" &&
			Math.abs(move.fromCol - move.toCol) == 2
		) {
			const isKingSide = move.toCol > move.fromCol;
			notation = isKingSide ? "O-O" : "O-O-O";
		} else {
			notation = `${notations[move.piece.name]}${cols[move.toCol]}${
				rows[move.toRow]
			}`;
		}

		if (move.causesCheckmate) {
			notation += "#";
		} else if (move.causesCheck) {
			notation += "+";
		}

		return notation;
	}

	const movePairs = [];
	for (let i = 0; i < moveHistory.length; i += 2) {
		const whiteMove = moveHistory[i];
		const blackMove = moveHistory[i + 1];
		movePairs.push([whiteMove, blackMove]);
	}

	return (
		<div>
			<div className="grid grid-cols-[30px_5px_75px_75px]">
				<h3 className="col-span-4 bg-[#faf0d4] border-b-2 border-color-[#faf0d4] text-center font-bold">
					Move History
				</h3>
			</div>
			<div>
				{movePairs.map((pair, index) => (
					<div
						key={index}
						className="grid grid-cols-[30px_5px_75px_75px] bg-[#faf0d4]"
					>
						<div className=" border-b-2 border-r-2 border-color-[#303030] pl-1 text-left font-bold text-[#303030]">
							{index + 1}.
						</div>
						<div className="border-b-2 border-color-[#303030]"></div>
						<button
							onClick={() => handleClick(index, 0)}
							className="bg-[#faf0d4] text-[#303030] font-bold
              text-left border-b-2 border-color-[#303030]"
						>
							{getMoveNotation(pair[0])}
						</button>
						<button
							onClick={() => handleClick(index, 1)}
							className="bg-[#303030] text-[#faf0d4] font-bold text-left 
              pl-[7px] pr-1 "
						>
							{pair[1] ? getMoveNotation(pair[1]) : ""}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
