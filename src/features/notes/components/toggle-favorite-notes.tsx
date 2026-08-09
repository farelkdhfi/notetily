// toggle-favorite-notes.tsx
"use client"

import { toggleFavorite } from "@/lib/api/notes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Star } from "lucide-react"

interface NoteType {
  id: string
  is_favorite: boolean
}

interface ToggleProps {
  note: NoteType
}

export default function ToggleFavoriteNotes({ note }: ToggleProps) {
  const queryClient = useQueryClient()

  const toggleFavoriteMutation = useMutation({
    mutationFn: () => toggleFavorite(!note.is_favorite, note.id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", note.id] })
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    },
  })

  return (
    <button
      type="button"
      disabled={toggleFavoriteMutation.isPending}
      onClick={() => toggleFavoriteMutation.mutate()}
      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Star
        size={15}
        strokeWidth={1.8}
        className={`shrink-0 ${note.is_favorite ? "text-yellow-500" : "text-gray-400"}`}
        fill={note.is_favorite ? "currentColor" : "none"}
      />
      <span className="font-medium">
        {note.is_favorite ? "Remove from favorites" : "Add to favorites"}
      </span>
    </button>
  )
}