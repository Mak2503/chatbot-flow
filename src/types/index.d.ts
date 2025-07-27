// Represents the basic metadata for a node type (could be extended for different types)
export type NodeMetadata = {
  id: string;
  title: string;
  type: "message";
  iconUrl: string;
};

// If there will be multiple node kinds in the future, this is extensible:
export type NodeKind = "message";

export type FlowNode = {
  id: string;
  position: { x: number; y: number };
  type: NodeKind;
  data: {
    title: string;
    label?: string;
  };
  selected: boolean;
};

// Edge connection between two nodes
export type FlowEdge = {
  id: string;
  source: string;
  target: string;
  type?: string;
};

// Specific data for a "Send Message" node
// export type SendMessageNodeData = {
//   title: string;
//   label?: string;
// };
