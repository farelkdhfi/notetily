"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Search, X, FileText } from "lucide-react"

import { searchNotes } from "@/lib/api/notes"
import { stripHtml } from "@/lib/utils/strip-html"
import { formatNoteDate } from "@/lib/utils/format-date"

interface GlobalSearchProps {
  open: boolean
  onClose: () => void
}

// Highlight bagian teks yang cocok dengan query
function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text

  const index = text.toLowerCase().indexOf(query.toLowerCase())
  if (index === -1) return text

  const before = text.slice(0, index)
  const match = text.slice(index, index + query.length)
  const after = text.slice(index + query.length)

  return (
    <>
      {before}
      <mark className="rounded-sm bg-yellow-200/60 text-gray-900">
        {match}
      </mark>
      {after}
    </>
  )
}

export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)

  // Debounce 300ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  const { data: results, isLoading, isFetching } = useQuery({
    queryKey: ["notes-search-global", debouncedQuery],
    queryFn: () => searchNotes(debouncedQuery),
    enabled: open && debouncedQuery.trim().length > 0,
  })

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timeout)
    } else {
      setQuery("")
      setDebouncedQuery("")
    }
  }, [open])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  const handleSelect = (noteId: string) => {
    router.push(`/notes/${noteId}`)
    onClose()
  }

  if (!open) return null

  const isSearching = isLoading || isFetching

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/20 px-4 pt-[12vh] backdrop-blur-[2px]"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5">
          <Search size={16} strokeWidth={1.8} className="shrink-0 text-gray-400" />

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your notes..."
            className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-300"
          />

          <button
            type="button"
            onClick={onClose}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100"
          >
            <X size={14} strokeWidth={1.8} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim().length === 0 && (
            <p className="px-3 py-8 text-center text-xs text-gray-400">
              Search by title or content
            </p>
          )}

          {query.trim().length > 0 && isSearching && (
            <div className="space-y-1 px-1">
              <div className="h-14 animate-pulse rounded-xl bg-gray-50" />
              <div className="h-14 animate-pulse rounded-xl bg-gray-50" />
              <div className="h-14 animate-pulse rounded-xl bg-gray-50" />
            </div>
          )}

          {query.trim().length > 0 &&
            !isSearching &&
            results?.length === 0 && (
              <p className="px-3 py-8 text-center text-xs text-gray-400">
                No notes found for "{query}"
              </p>
            )}

          {results?.map((note) => {
            const plainContent = stripHtml(note.content)
            const titleMatches = note.title
              .toLowerCase()
              .includes(debouncedQuery.toLowerCase())

            return (
              <button
                key={note.id}
                type="button"
                onClick={() => handleSelect(note.id)}
                className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-gray-50"
              >
                <FileText
                  size={15}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-gray-300"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {titleMatches
                      ? highlightMatch(note.title || "Untitled", debouncedQuery)
                      : note.title || "Untitled"}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-gray-400">
                    {titleMatches
                      ? plainContent || "No additional text"
                      : highlightMatch(
                          plainContent || "No additional text",
                          debouncedQuery
                        )}
                  </p>
                </div>

                <span className="shrink-0 text-[10px] text-gray-300">
                  {formatNoteDate(note.updated_at ?? note.created_at)}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}