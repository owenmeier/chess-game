import React from "react";

export default function Square({ row, col }) {
  const isDark =
    (row % 2 == 0 && col % 2 == 0) || (row % 2 == 1 && col % 2 == 1);
  const color = isDark ? "bg-[#9c6b41]" : "bg-[#faebd2]";
  //when row is even, then isDark == true when col is odd
  // when row is odd, then isDark == true when col is even

  return <div className={`w-[50px] h-[50px] ${color}`}></div>;
}
