export interface GraphNoteData {
  id: string
  title: string
}

export interface GraphRelation {
  note_id_a: string
  note_id_b: string
}

export interface LayoutNode {
  id: string
  position: { x: number; y: number }
  data: { label: string; isIsolated: boolean }
}

export interface LayoutEdge {
  id: string
  source: string
  target: string
}

export function computeGraphLayout(
  notes: GraphNoteData[],
  relations: GraphRelation[]
): { nodes: LayoutNode[]; edges: LayoutEdge[] } {
  const connectedIds = new Set<string>()
  relations.forEach((rel) => {
    connectedIds.add(rel.note_id_a)
    connectedIds.add(rel.note_id_b)
  })

  const connectedNotes = notes.filter((n) => connectedIds.has(n.id))
  const isolatedNotes = notes.filter((n) => !connectedIds.has(n.id))

  const nodes: LayoutNode[] = []

  // Connected notes: susun melingkar di tengah biar hubungan gampang keliatan
  const centerX = 400
  const centerY = 300
  const radius = Math.max(150, connectedNotes.length * 25)

  connectedNotes.forEach((note, i) => {
    const angle = (i / Math.max(connectedNotes.length, 1)) * 2 * Math.PI
    nodes.push({
      id: note.id,
      position: {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      },
      data: { label: note.title || "Untitled", isIsolated: false },
    })
  })

  // Isolated notes: susun grid rapi di bagian bawah, terpisah dari cluster utama
  const gridCols = 6
  const gridStartY = centerY + radius + 150

  isolatedNotes.forEach((note, i) => {
    const col = i % gridCols
    const row = Math.floor(i / gridCols)
    nodes.push({
      id: note.id,
      position: {
        x: 100 + col * 180,
        y: gridStartY + row * 100,
      },
      data: { label: note.title || "Untitled", isIsolated: true },
    })
  })

  const edges: LayoutEdge[] = relations.map((rel) => ({
    id: `${rel.note_id_a}-${rel.note_id_b}`,
    source: rel.note_id_a,
    target: rel.note_id_b,
  }))

  return { nodes, edges }
}