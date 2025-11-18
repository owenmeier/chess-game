import React from "react";
import Piece from "./Piece";

export default function Square({
	row,
	col,
	piece,
	highlighted,
	onClick,
	kingInCheck,
}) {
	const isDark =
		(row % 2 == 1 && col % 2 == 0) || (row % 2 == 0 && col % 2 == 1);
	const color = isDark ? "bg-[#a8744a]" : "bg-[#faebd2]";
	//when row is even, then isDark == true when col is odd
	// when row is odd, then isDark == true when col is even

	let backgroundColor = color;
	if (kingInCheck) {
		backgroundColor = "bg-[#fc4c66]";
	} else if (highlighted) {
		backgroundColor = "bg-[#fce174]";
	}

	return (
		<div className={`w-[50px] h-[50px] ${backgroundColor}`} onClick={onClick}>
			{piece && <Piece {...piece} key={piece.id} />}
		</div>
	); // adding to commit
}
