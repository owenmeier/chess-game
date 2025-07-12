import { Board, MoveHistory } from "./components/index.jsx";
import React from "react";

export default function App() {
  return (
    <>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 min-h-screen">
        <div></div>
        <div>
          <Board className="flex justify-center items-center" />
        </div>
        <div className="flex pt-4">
          <div>
            <MoveHistory />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
