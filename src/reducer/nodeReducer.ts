import { applyNodeChanges, type NodeChange } from "@xyflow/react";
import type { FlowNode, NodeKind } from "../types";
import { generateNodeData } from "../utils";

export type NodeAction =
  | { type: "ADD_NODE"; nodeKind: NodeKind; position: { x: number; y: number } }
  | { type: "UPDATE_NODE"; changes: FlowNode }
  | { type: "UPDATE_NODES_FLOW"; changes: NodeChange<FlowNode>[] }
  | { type: "SELECT_NODE"; nodeId: string }
  | { type: "DESELECT_NODE"; nodeId: string }
  | { type: "DELETE_NODE"; nodeId: string };

export function nodeReducer(state: FlowNode[], action: NodeAction): FlowNode[] {
  switch (action.type) {
    case "ADD_NODE": {
      const nextId = `${action.nodeKind}_${state.length + 1}`;
      return [
        ...state,
        {
          id: nextId,
          type: action.nodeKind,
          position: action.position,
          data: generateNodeData(action.nodeKind),
          selected: false,
        },
      ];
    }
    case "UPDATE_NODE":
      return state.map((node) => {
        return node.id === action.changes.id
          ? { ...node, ...action.changes }
          : node;
      });
    case "SELECT_NODE":
      return state.map((node) => {
        return node.id === action.nodeId
          ? { ...node, selected: true }
          : { ...node, selected: false };
      });
    case "DESELECT_NODE":
      return state.map((node) => {
        return node.id === action.nodeId
          ? { ...node, selected: false }
          : node;
      });
    case "UPDATE_NODES_FLOW":
      return applyNodeChanges(action.changes, state);
    case "DELETE_NODE":
      return state.filter((node) => node.id !== action.nodeId);
    default:
      return state;
  }
}
