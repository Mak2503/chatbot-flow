import type { NodeKind } from "../types";

export const generateNodeData = (nodeType: NodeKind) => {
  switch (nodeType) {
    case "message":
      return {
        title: "Send Message",
        label: "Hello!",
      };
    // Add more cases for other node types as needed
    default:
      throw new Error(`Unknown node type: ${nodeType}`);
  }
}