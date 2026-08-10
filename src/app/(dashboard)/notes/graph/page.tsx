"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { Waypoints } from "lucide-react"

import { getAllNotesForHealth, getAllNoteRelations } from "@/lib/api/notes"
import { computeGraphLayout } from "@/lib/utils/graph-layout"
import GraphNoteNode from "@/features/notes/components/graph-note-node"

const nodeTypes = { noteNode: GraphNoteNode }

export default function NotesGraphPage() {
  const router = useRouter()

  const { data: notes, isLoading: notesLoading } = useQuery({
    queryKey: ["notes", "health"],
    queryFn: getAllNotesForHealth,
  })

  const { data: relations, isLoading: relationsLoading } = useQuery({
    queryKey: ["note-relations", "all"],
    queryFn: getAllNoteRelations,
  })

  const { nodes, edges } = useMemo(() => {
    if (!notes || !relations) return { nodes: [], edges: [] }

    const layout = computeGraphLayout(
      notes.map((n) => ({ id: n.id, title: n.title })),
      relations
    )

    const flowNodes: Node[] = layout.nodes.map((n) => ({
      id: n.id,
      position: n.position,
      data: n.data,
      type: "noteNode",
    }))

    return { nodes: flowNodes, edges: layout.edges }
  }, [notes, relations])

  const isLoading = notesLoading || relationsLoading

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    router.push(`/notes/${node.id}`)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-pulse rounded-full bg-gray-100" />
          <p className="text-sm text-gray-400">Building your graph...</p>
        </div>
      </div>
    )
  }

  if (nodes.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-300">
            <Waypoints size={24} strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-gray-900">
            No notes to visualize yet
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Create some notes to see them here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      {/* Header overlay */}
      <div className="absolute left-8 top-6 z-10">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
          <Waypoints size={12} strokeWidth={2} />
          Knowledge graph
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
          {nodes.length} notes, {edges.length} connections
        </h1>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          style: { stroke: "#d1d5db", strokeWidth: 1.5 },
        }}
      >
        <Background color="#f3f4f6" gap={20} />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor="#e5e7eb"
          maskColor="rgba(247, 247, 245, 0.8)"
          className="!border !border-gray-200 !rounded-xl"
        />
      </ReactFlow>
    </div>
  )
}