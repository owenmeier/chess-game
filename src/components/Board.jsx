import React from "react";
import Square from "./Square";

export default function Board() {
  return (
    <div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div className="flex">
          {Array.from({ length: 8 }).map((_, j) => (
            <Square key={`${i}.${j}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
