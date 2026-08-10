"use client"

import { Handle, Position } from "@xyflow/react"
import { FileText } from "lucide-react"

interface GraphNoteNodeProps {
  data: {
    label: string
    isIsolated: boolean
  }
}

export default function GraphNoteNode({ data }: GraphNoteNodeProps) {
  return (
    <div
      className={`flex max-w-[160px] items-center gap-2 rounded-xl border px-3 py-2 shadow-sm transition ${
        data.isIsolated
          ? "border-gray-200 bg-gray-50/50 opacity-60"
          : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-md"
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-300" />

      <FileText size={13} strokeWidth={1.8} className="shrink-0 text-gray-400" />
      <span className="truncate text-xs font-medium text-gray-700">
        {data.label}
      </span>

      <Handle type="source" position={Position.Bottom} className="!bg-gray-300" />
    </div>
  )
}