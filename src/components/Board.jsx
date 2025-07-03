import Square from "./Square";

export default function Board() {
  return (
    <div>
      {Array.from({ length: 8 }).map((_, i) => (
        <Square key={i} />
      ))}
    </div>
  );
}
