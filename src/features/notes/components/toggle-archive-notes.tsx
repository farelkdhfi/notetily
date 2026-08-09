// toggle-archive-notes.tsx
"use client"

import { toggleArchive } from "@/lib/api/notes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Archive, ArchiveRestore } from "lucide-react"

interface NoteType {
  id: string
  is_archived: boolean
}

interface ToggleProps {
  note: NoteType
}

export default function ToggleArchiveNotes({ note }: ToggleProps) {
  const queryClient = useQueryClient()

  const toggleArchiveMutation = useMutation({
    mutationFn: () => toggleArchive(!note.is_archived, note.id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", note.id] })
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    },
  })

  return (
    <button
      type="button"
      disabled={toggleArchiveMutation.isPending}
      onClick={() => toggleArchiveMutation.mutate()}
      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {note.is_archived ? (
        <ArchiveRestore size={15} strokeWidth={1.8} className="shrink-0 text-gray-400" />
      ) : (
        <Archive size={15} strokeWidth={1.8} className="shrink-0 text-gray-400" />
      )}
      <span className="font-medium">
        {note.is_archived ? "Unarchive note" : "Archive note"}
      </span>
    </button>
  )
}