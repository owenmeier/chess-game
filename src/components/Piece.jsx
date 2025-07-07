import React from "react";

export default function Piece({ name, color, id }) {
  return (
    <span className={`${color == "black" ? "text-black" : "text-white"}`}>
      {name && name.toString()}
    </span>
  );
}
