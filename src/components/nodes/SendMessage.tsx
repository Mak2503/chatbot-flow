import React from "react";
import { Handle, Position } from "@xyflow/react";
import WhatsAppIcon from "../../assets/whatsapp.svg";

// Define proper type for props
interface SendMessageNodeProps {
  data: {
    title: string;
    label?: string;
  };
  selected?: boolean;
}

const SendMessageNode: React.FC<SendMessageNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`border ${selected ? "border-blue-500" : "border-gray-600"} rounded-lg flex flex-col bg-white min-w-[200px]`}
    >
      {/* Header */}
      <div className="p-1 px-3 bg-green-300 rounded-t-lg flex items-center justify-between">
        <h2 className="text-lg font-semibold">{data.title}</h2>
        <img src={WhatsAppIcon} alt="WhatsApp Icon" className="w-6 h-6" />
      </div>

      {/* Message body */}
      <div className="py-2 px-3 min-h-10 max-w-[300px] overflow-auto">
        {data.label ? (
          <p>{data.label}</p>
        ) : (
          <p className="text-gray-500 italic" aria-label="No Message">
            No Message
          </p>
        )}
      </div>

      {/* Handles */}
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default SendMessageNode;
