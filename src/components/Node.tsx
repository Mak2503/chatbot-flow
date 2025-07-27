import type { DragEventHandler } from "react";
import type { NodeMetadata } from "../types";

const Node = ({
  id,
  iconUrl,
  title,
  onDrag,
}: NodeMetadata & { onDrag: DragEventHandler<HTMLDivElement> }) => {
  return (
    <div
      id={id}
      className="px-8 py-3 border rounded flex flex-col justify-center items-center cursor-pointer"
      draggable
      onDragStart={onDrag}
    >
      <img src={iconUrl} alt={title} width={25} height={25} draggable={false} />
      <h3>{title}</h3>
    </div>
  );
};

export default Node;
