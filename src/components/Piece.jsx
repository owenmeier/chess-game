import React from "react";

export default function Piece({ name }, color, id) {
  return <span>{name && name.toString()}</span>;
}
