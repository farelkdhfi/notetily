"use client"

import { useState } from "react"
import { X, Search, Link2 } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { searchNotesByTitle, addNoteRelation } from "@/lib/api/notes"

interface ModalRelatedNotesProps {
  open: boolean
  noteId: string
  onClose: () => void
}

export default function ModalRelatedNotes({
  open,
  noteId,
  onClose,
}: ModalRelatedNotesProps) {
  const [query, setQuery] = useState("")
  const queryClient = useQueryClient()

  const { data: results, isLoading } = useQuery({
    queryKey: ["notes-search", query, noteId],
    queryFn: () => searchNotesByTitle(query, noteId),
    enabled: open && query.trim().length > 0,
  })

  const addMutation = useMutation({
    mutationFn: (targetId: string) => addNoteRelation(noteId, targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["related-notes", noteId] })
    },
  })

  const handleClose = () => {
    setQuery("")
    onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 px-4 pt-[15vh] backdrop-blur-[2px]"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <div className="flex items-center gap-2 text-gray-400">
            <Search size={15} strokeWidth={1.8} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes to link..."
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-300"
            />
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100"
          >
            <X size={14} strokeWidth={1.8} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {query.trim().length === 0 && (
            <p className="px-3 py-6 text-center text-xs text-gray-400">
              Type to search notes by title
            </p>
          )}

          {isLoading && (
            <div className="space-y-1 px-1">
              <div className="h-10 animate-pulse rounded-lg bg-gray-50" />
              <div className="h-10 animate-pulse rounded-lg bg-gray-50" />
            </div>
          )}

          {query.trim().length > 0 && !isLoading && results?.length === 0 && (
            <p className="px-3 py-6 text-center text-xs text-gray-400">
              No notes found.
            </p>
          )}

          {results?.map((note) => (
            <button
              key={note.id}
              type="button"
              onClick={() => addMutation.mutate(note.id)}
              disabled={addMutation.isPending}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-gray-50 disabled:opacity-50"
            >
              <Link2 size={14} strokeWidth={1.8} className="shrink-0 text-gray-300" />
              <span className="truncate text-sm text-gray-700">
                {note.title || "Untitled"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}