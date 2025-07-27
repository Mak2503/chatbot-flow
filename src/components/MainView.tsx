import React, { useCallback, useReducer, useState } from "react";
import {
  applyEdgeChanges,
  addEdge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  ReactFlowProvider,
} from "@xyflow/react";
import NodesPanel from "./NodesPanel";
import "@xyflow/react/dist/style.css";
import type { FlowEdge, FlowNode } from "../types";
import { nodeReducer } from "../reducer/nodeReducer";
import Flow from "./Flow";

const nodeTypes = {
  message: React.lazy(() => import("./nodes/SendMessage")),
};

const MainView = () => {
  const [nodes, dispatchNodes] = useReducer(nodeReducer, []);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [error, setError] = useState<string>(""); // For error messages

  console.log("Nodes", nodes);

  const onNodesChange = useCallback((changes: NodeChange<FlowNode>[]) => {
    dispatchNodes({ type: "UPDATE_NODES_FLOW", changes });
  }, []);

  const onEdgesChange = useCallback(
    (changes: EdgeChange<FlowEdge>[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => {
        // Prevent self-connection and multiple connections from the same source
        const filteredEdges = edgesSnapshot.filter(
          (edge) => !(edge.source === params.source)
        );
        return addEdge(params, filteredEdges);
      }),
    []
  );

  const onSave = () => {
    if (nodes.length <= 1) {
      setError("");
      alert("Saved successfully!");
      return;
    }

    // Find nodes with no incoming edges
    const nodesWithNoIncoming = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    // A simple error with timeout
    if (nodesWithNoIncoming.length > 1) {
      setError("Error: More than one node has no incoming connections.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      setError("");
      alert("Saved successfully!");
    }
  };

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      // Remove the node
      dispatchNodes({ type: "DELETE_NODE", nodeId });

      // Remove edges connected to the deleted node
      setEdges((edgesSnapshot) =>
        edgesSnapshot.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        )
      );
    },
    [dispatchNodes, setEdges]
  );

  return (
    <main className="bg-gray-100 w-full">
      <section className="flex justify-end w-full p-3 bg-gray-300">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Save Changes
        </button>
      </section>
      {error && (
        <section className="absolute top-8 left-[50%] translate-[-50%] p-3 text-center font-semibold rounded bg-red-200">
          {error}
        </section>
      )}
      <section className="flex">
        {/* Flow Content */}
        <div className="w-3/4 h-[91vh]">
          <ReactFlowProvider>
            <Flow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              dispatchNodes={dispatchNodes}
            />
          </ReactFlowProvider>
        </div>
        {/* Nodes Panel */}
        <NodesPanel
          node={nodes.find((node) => node.selected)}
          dispatchNodes={dispatchNodes}
          deleteNode={handleDeleteNode}
        />
      </section>
    </main>
  );
};

export default MainView;
