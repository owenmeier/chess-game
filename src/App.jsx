import { Board, Square } from "./components/index.jsx";
import React from "react";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Board />
    </div>
  );
}
