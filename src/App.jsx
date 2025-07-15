import { Board, MoveHistory } from "./components/index.jsx";
import { getInitialBoard } from "./components/Board.jsx";
import React, { useState } from "react";

export default function App() {
  const [moveHistory, setMoveHistory] = useState([]);
  const [board, setBoard] = useState(getInitialBoard);
  const [turn, setTurn] = useState("white");
  const [curMoveIndex, setCurMoveIndex] = useState(-1);

  return (
    <>
      <div className="grid grid-cols-3 min-h-screen">
        <div></div>
        <div className="flex justify-center items-center">
          <Board
            board={board}
            setBoard={setBoard}
            moveHistory={moveHistory}
            setMoveHistory={setMoveHistory}
            setTurn={setTurn}
            turn={turn}
            curMoveIndex={curMoveIndex}
            setCurMoveIndex={setCurMoveIndex}
          />
        </div>
        <div className="grid grid-cols-2">
          <div className="flex p-4">
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
