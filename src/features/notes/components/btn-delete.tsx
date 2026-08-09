// btn-delete.tsx
"use client"

import { deleteNote } from "@/lib/api/notes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

interface DeleteNoteProps {
  id: string
}

export default function ButtonDeleteNote({ id }: DeleteNoteProps) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", id] })
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      router.push("/notes")
    },
  })

  return (
    <button
      type="button"
      disabled={deleteMutation.isPending}
      onClick={() => deleteMutation.mutate(id)}
      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={15} strokeWidth={1.8} className="shrink-0" />
      <span className="font-medium">
        {deleteMutation.isPending ? "Deleting..." : "Delete note"}
      </span>
    </button>
  )
}