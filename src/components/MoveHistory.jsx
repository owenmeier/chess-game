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

  const movePairs = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    const whiteMove = moveHistory[i];
    const blackMove = moveHistory[i + 1];
    movePairs.push([whiteMove, blackMove]);
  }

  return (
    <div>
      <h3>Move History</h3>
      <div>
        {movePairs.map((pair, index) => (
          <div key={index} className="grid grid-cols-[30px_60px_60px]">
            <div className="border border-blue-300 pl-1 text-left">
              {index + 1}.
            </div>
            <button
              onClick={() => handleClick(index, 0)}
              className="border border-green-300 text-left pl-2"
            >
              {notations[pair[0].piece.name]}
              {cols[pair[0].toCol]}
              {pair[0].toRow}
            </button>
            <button
              onClick={() => handleClick(index, 1)}
              className="border border-red-300 text-left pl-2 pr-1"
            >
              {pair[1]
                ? `${notations[pair[1].piece.name]}${cols[pair[1].toCol]}${
                    pair[1].toRow
                  }`
                : ""}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
