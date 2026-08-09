// app/notes/new/page.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createNotes } from "@/lib/api/notes"
import NoteEditor from "@/features/notes/components/note-editor"

export default function NewNotePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")

  const isCreatingRef = useRef(false)

  const createMutation = useMutation({
    mutationFn: createNotes,
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })

      const params = new URLSearchParams(searchParams.toString())
      const query = params.toString()

      router.replace(`/notes/${newNote.id}${query ? `?${query}` : ""}`)
    },
  })

  useEffect(() => {
    // content dari Tiptap kosong itu "<p></p>", bukan string kosong murni
    const isContentEmpty =
      content.trim() === "" || content.trim() === "<p></p>"
    const hasContent = title.trim().length > 0 || !isContentEmpty

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
        <NoteEditor content={content} onChange={setContent} />
      </div>
    </article>
  )
}