import Node from "./Node";
import Message from "../assets/message.svg";
import type { DragEvent } from "react";
import type { FlowNode, NodeMetadata } from "../types";
import type { NodeAction } from "../reducer/nodeReducer";

const nodes: NodeMetadata[] = [
  {
    id: "message",
    title: "Message",
    type: "message",
    iconUrl: Message,
  },
];

const NodesPanel = ({
  node,
  dispatchNodes,
}: {
  node: FlowNode | undefined;
  dispatchNodes: React.ActionDispatch<[action: NodeAction]>;
}) => {
  function dragstartHandler(ev: DragEvent) {
    ev.dataTransfer.setData("text", (ev.target as HTMLElement).id);
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatchNodes({
      type: "UPDATE_NODE",
      changes: {
        ...node!,
        data: { title: node?.data?.title || "", label: e.target.value },
      },
    });
  };

  const handleBackClick = () => {
    dispatchNodes({ type: "DESELECT_NODE", nodeId: node?.id || "" });
  };

  return (
    <aside className="border-l border-gray-300 p-3 w-1/4 bg-white">
      {node?.id ? (
        <div>
          <div className="flex items-center justify-between border-b border-gray-300 pb-3 -mx-3">
            {/* Back Icon Button */}
            <button
              className="ml-3 flex items-center cursor-pointer"
              onClick={handleBackClick}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M13 16L7 10L13 4"
                  stroke="#4B5563"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h3 className="text-lg font-semibold">{node?.data?.title}</h3>
            <div></div>
          </div>
          <div className="flex flex-col space-y-2 border-b border-gray-300 px-3 py-6 -mx-3">
            <label className="text-gray-500">Text</label>
            <textarea
              className="border p-2 rounded focus:outline-none focus:ring-0 border-gray-300 text-sm"
              value={node?.data?.label}
              onChange={onChange}
              placeholder="Enter message text"
            />
          </div>
        </div>
      ) : (
        <>
          <h2 className="ml-2 text-xl font-semibold">Nodes</h2>
          <div className="ml-2 mt-4 flex flex-wrap">
            {nodes.map((node) => (
              <Node key={node.id} {...node} onDrag={dragstartHandler} />
            ))}
          </div>
        </>
      )}
      {/* Remove Node Button */}
      {node?.id && (
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          onClick={() =>
            dispatchNodes({ type: "DELETE_NODE", nodeId: node.id })
          }
        >
          Remove Node
        </button>
      )}
    </aside>
  );
};

export default NodesPanel;
