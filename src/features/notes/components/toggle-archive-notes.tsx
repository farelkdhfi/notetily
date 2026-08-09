"use client"

import { toggleArchive } from "@/lib/api/notes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Archive } from "lucide-react"

interface NoteType {
  id: string
  is_archived: boolean
}

interface ToggleProps {
  note: NoteType
}

export default function ToggleArchiveNotes({
  note,
}: ToggleProps) {
  const queryClient = useQueryClient()

  const toggleArchiveMutation = useMutation({
    mutationFn: () =>
      toggleArchive(
        !note.is_archived,
        note.id
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["note", note.id],
      })

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      })
    },
  })

  return (
    <button
      type="button"
      disabled={toggleArchiveMutation.isPending}
      onClick={() =>
        toggleArchiveMutation.mutate()
      }
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 hover:bg-black/[0.04] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {/* Icon */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
          note.is_archived
            ? "bg-gray-200 text-gray-700"
            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
        }`}
      >
        <Archive
          size={16}
          strokeWidth={1.8}
        />
      </div>

      {/* Label */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="font-medium text-gray-800">
          {note.is_archived
            ? "Unarchive Note"
            : "Archive Note"}
        </span>

        <span className="text-[11px] text-gray-400">
          {note.is_archived
            ? "Move this note back to notes"
            : "Move this note to archive"}
        </span>
      </div>
    </button>
  )
}