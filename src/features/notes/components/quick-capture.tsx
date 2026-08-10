"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Zap, CornerDownLeft } from "lucide-react"

import { createNotes } from "@/lib/api/notes"

export default function QuickCapture() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const createMutation = useMutation({
    mutationFn: createNotes,
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      setValue("")
      setOpen(false)
      router.push(`/notes/${newNote.id}`)
    },
  })

  // Global shortcut: Cmd+K / Ctrl+K untuk buka, Esc untuk tutup
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"

      if (isCmdK) {
        e.preventDefault()
        setOpen((prev) => !prev)
        return
      }

      if (e.key === "Escape" && open) {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  // Auto-focus textarea begitu modal terbuka
  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timeout)
    }
  }, [open])

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || createMutation.isPending) return

    // Baris pertama jadi title, sisanya jadi content.
    // Kalau cuma satu baris, title = isi itu sendiri, content kosong.
    const lines = trimmed.split("\n")
    const firstLine = lines[0].trim()
    const rest = lines.slice(1).join("\n").trim()

    createMutation.mutate({
      title: firstLine || "Untitled",
      content: rest ? `<p>${rest}</p>` : "",
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter submit, Shift+Enter baris baru
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/20 px-4 pt-[15vh] backdrop-blur-[2px]"
      onMouseDown={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-start gap-3 px-5 py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            <Zap size={15} strokeWidth={1.8} />
          </div>

          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What do you want to capture?"
            rows={1}
            disabled={createMutation.isPending}
            className="max-h-40 w-full resize-none bg-transparent pt-1.5 text-[15px] text-gray-900 outline-none placeholder:text-gray-300 disabled:opacity-50"
          />
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-2.5">
          <p className="text-xs text-gray-400">
            {createMutation.isPending
              ? "Creating..."
              : "First line becomes the title"}
          </p>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <CornerDownLeft size={11} strokeWidth={2} />
              to capture
            </span>

            <span className="rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
              Esc
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}