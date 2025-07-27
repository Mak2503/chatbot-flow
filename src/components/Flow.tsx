import {
  Background,
  ReactFlow,
  useReactFlow,
  type NodeTypes,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import type { FlowEdge, FlowNode, NodeKind } from "../types";
import type { ActionDispatch, DragEvent } from "react";
import type { NodeAction } from "../reducer/nodeReducer";

interface FlowProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  nodeTypes: NodeTypes;
  onNodesChange: OnNodesChange<FlowNode>;
  onEdgesChange: OnEdgesChange<FlowEdge>;
  onConnect: OnConnect;
  dispatchNodes: ActionDispatch<[action: NodeAction]>;
}

const Flow: React.FC<FlowProps> = ({
  nodes,
  edges,
  nodeTypes,
  onNodesChange,
  onEdgesChange,
  onConnect,
  dispatchNodes,
}) => {
  const { screenToFlowPosition } = useReactFlow();

  function dragoverHandler(ev: DragEvent) {
    ev.preventDefault();
  }

  function dropHandler(ev: DragEvent) {
    ev.preventDefault();
    const nodeType = ev.dataTransfer.getData("text") as NodeKind;

    // Calculate position relative to screen
    const position = screenToFlowPosition({
      x: ev.clientX,
      y: ev.clientY,
    });
    // Dispatch an action to add a new node
    dispatchNodes({
      type: "ADD_NODE",
      nodeKind: nodeType,
      position,
    });
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onDragOver={dragoverHandler}
      onDrop={dropHandler}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={{ maxZoom: 1 }}
    >
      <Background />
    </ReactFlow>
  );
};

export default Flow;
