"use client"

import { useState } from "react"
import Link from "next/link"
import { Link2, Plus, X } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { getRelatedNotes, removeNoteRelation } from "@/lib/api/notes"
import { stripHtml } from "@/lib/utils/strip-html"
import ModalRelatedNotes from "./modal-related-notes"

interface RelatedNotesProps {
  noteId: string
}

export default function RelatedNotes({ noteId }: RelatedNotesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data: related, isLoading } = useQuery({
    queryKey: ["related-notes", noteId],
    queryFn: () => getRelatedNotes(noteId),
  })

  const removeMutation = useMutation({
    mutationFn: (targetId: string) => removeNoteRelation(noteId, targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["related-notes", noteId] })
    },
  })

  return (
    <div className="mt-16 border-t border-gray-100 pt-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
          <Link2 size={12} strokeWidth={2} />
          Related notes
        </p>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-gray-400 transition hover:bg-gray-50 hover:text-gray-900"
        >
          <Plus size={13} strokeWidth={2} />
          Add
        </button>
      </div>

      {isLoading && (
        <div className="space-y-1.5">
          <div className="h-10 animate-pulse rounded-lg bg-gray-50" />
          <div className="h-10 animate-pulse rounded-lg bg-gray-50" />
        </div>
      )}

      {!isLoading && related?.length === 0 && (
        <p className="text-xs text-gray-400">
          No related notes yet. Link notes that belong together.
        </p>
      )}

      {related && related.length > 0 && (
        <div className="space-y-1.5">
          {related.map((note) => (
            <div
              key={note.id}
              className="group flex items-center gap-3 rounded-xl border border-gray-100 px-3.5 py-2.5 transition hover:border-gray-200"
            >
              <Link
                href={`/notes/${note.id}`}
                className="min-w-0 flex-1"
              >
                <p className="truncate text-sm font-medium text-gray-900">
                  {note.title || "Untitled"}
                </p>
                <p className="truncate text-xs text-gray-400">
                  {stripHtml(note.content) || "No additional text"}
                </p>
              </Link>

              <button
                type="button"
                onClick={() => removeMutation.mutate(note.id)}
                disabled={removeMutation.isPending}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-300 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                aria-label="Remove relation"
                title="Remove relation"
              >
                <X size={13} strokeWidth={1.8} />
              </button>
            </div>
          ))}
        </div>
      )}

      <ModalRelatedNotes
        open={isModalOpen}
        noteId={noteId}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}