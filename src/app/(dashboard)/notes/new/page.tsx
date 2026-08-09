// app/notes/new/page.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createNotes } from "@/lib/api/notes"

export default function NewNotePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")

  // Cegah create ganda kalau debounce ke-trigger dua kali
  const isCreatingRef = useRef(false)

  const createMutation = useMutation({
    mutationFn: createNotes,
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })

      const params = new URLSearchParams(searchParams.toString())
      const query = params.toString()

      // Pindah diam-diam ke URL note yang sebenarnya, tanpa nambah history
      router.replace(`/notes/${newNote.id}${query ? `?${query}` : ""}`)
    },
  })

  // Debounce: begitu title atau content berubah, tunggu 1 detik lalu create
  useEffect(() => {
    const hasContent = title.trim().length > 0 || content.trim().length > 0

    if (!hasContent || isCreatingRef.current) {
      return
    }

    setStatus("saving")

    const timeout = setTimeout(() => {
      isCreatingRef.current = true

      createMutation.mutate(
        {
          title: title.trim() || "Untitled",
          content,
        },
        {
          onSettled: () => {
            isCreatingRef.current = false
          },
        }
      )
    }, 1000)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content])

  return (
    <article className="mx-auto w-full max-w-3xl bg-white">

      {/* Top bar */}
      <div className="mb-10 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
            New note
          </span>
        </div>

        <span className="text-xs text-gray-400">
          {status === "saving" && "Saving..."}
          {status === "idle" && "Start typing to save"}
        </span>
      </div>

      {/* Title */}
      <header>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="w-full text-4xl font-semibold leading-tight tracking-tight text-gray-900 outline-none placeholder:text-gray-300"
        />

        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
          <span>Note</span>
          <span>·</span>
          <span>Draft</span>
        </div>
      </header>

      <div className="my-10 h-px bg-gray-100" />

      {/* Content */}
      <div className="max-w-2xl">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          rows={12}
          className="w-full resize-none whitespace-pre-wrap text-[17px] leading-8 text-gray-600 outline-none placeholder:text-gray-300"
        />
      </div>
    </article>
  )
}