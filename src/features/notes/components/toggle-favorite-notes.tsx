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

export default function ToggleFavoriteNotes({
  note,
}: ToggleProps) {
  const queryClient = useQueryClient()

  const toggleFavoriteMutation = useMutation({
    mutationFn: () =>
      toggleFavorite(
        !note.is_favorite,
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
      disabled={toggleFavoriteMutation.isPending}
      onClick={() => toggleFavoriteMutation.mutate()}
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 hover:bg-black/[0.04] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {/* Icon */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
          note.is_favorite
            ? "bg-yellow-50 text-yellow-500"
            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
        }`}
      >
        <Star
          size={16}
          strokeWidth={1.8}
          fill={
            note.is_favorite
              ? "currentColor"
              : "none"
          }
        />
      </div>

      {/* Label */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="font-medium text-gray-800">
          {note.is_favorite
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </span>

        <span className="text-[11px] text-gray-400">
          {note.is_favorite
            ? "This note is favorited"
            : "Save this note to favorites"}
        </span>
      </div>
    </button>
  )
}