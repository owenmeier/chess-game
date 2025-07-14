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

export default function MoveHistory({ moveHistory }) {
  console.log(moveHistory);

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
          <div key={index} className="flex justify-between">
            <button className="flex-1 pl-2 pr-2">
              {index + 1}. {notations[pair[0].piece.name]}
              {cols[pair[0].toCol]}
              {pair[0].toRow}
            </button>
            <button className="pl-2 pr-2">
              {pair[1]
                ? `${index + 1}. ${notations[pair[1].piece.name]}${
                    cols[pair[1].toCol]
                  }${pair[1].toRow}`
                : ""}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
