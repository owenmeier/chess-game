import React from "react";

export default function Square({ row, col }) {
  const isDark =
    (row % 2 == 0 && col % 2 == 1) || (row % 2 == 1 && col % 2 == 0);
  const color = isDark ? "bg-blue-400" : "bg-gray-50";
  //when row is even, then isDark == true when col is odd
  // when row is odd, then isDark == true when col is even

  return <div className={`w-[50px] h-[50px] ${color}`}></div>;
}
