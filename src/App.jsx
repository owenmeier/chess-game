import { Board, MoveHistory } from "./components/index.jsx";
import { getInitialBoard } from "./components/Board.jsx";
import React, { useState } from "react";

export default function App() {
  const [moveHistory, setMoveHistory] = useState([]);
  const [board, setBoard] = useState(getInitialBoard);

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
          />
        </div>
        <div className="grid grid-cols-2">
          <div className="flex p-4">
            <MoveHistory
              moveHistory={moveHistory}
              board={board}
              setBoard={setBoard}
            />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
