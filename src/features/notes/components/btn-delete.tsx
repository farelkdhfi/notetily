
"use client"

import { deleteNote } from "@/lib/api/notes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

interface DeleteNoteProps {
  id: string
}

export default function ButtonDeleteNote({
  id,
}: DeleteNoteProps) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["note", id],
      })

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      })

      router.push("/notes")
    },
  })

  return (
    <button
      type="button"
      disabled={deleteMutation.isPending}
      onClick={() => deleteMutation.mutate(id)}
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 hover:bg-red-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {/* Icon */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors group-hover:bg-red-100">
        <Trash2
          size={16}
          strokeWidth={1.8}
        />
      </div>

      {/* Label */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="font-medium text-red-600">
          {deleteMutation.isPending
            ? "Deleting..."
            : "Delete Note"}
        </span>

        <span className="text-[11px] text-red-400">
          Permanently delete this note
        </span>
      </div>
    </button>
  )
}