"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Sparkles,
  FileQuestion,
  Copy,
  FolderX,
  Clock,
  AlignLeft,
  ChevronRight,
  Archive,
  Trash2,
} from "lucide-react"

import { getAllNotesForHealth, toggleArchive, deleteNote } from "@/lib/api/notes"
import { analyzeNotesHealth, type NoteHealthItem } from "@/lib/utils/notes-health"
import { stripHtml } from "@/lib/utils/strip-html"
import { formatNoteDate } from "@/lib/utils/format-date"

type CategoryKey =
  | "untitled"
  | "duplicates"
  | "withoutFolder"
  | "stale"
  | "veryShort"

export default function NotesCleanupPage() {
  const queryClient = useQueryClient()
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const { data: notes, isLoading, isError } = useQuery({
    queryKey: ["notes", "health"],
    queryFn: getAllNotesForHealth,
  })

  const report = useMemo(() => {
    if (!notes) return null
    return analyzeNotesHealth(notes as NoteHealthItem[])
  }, [notes])

  const archiveMutation = useMutation({
    mutationFn: (id: string) => toggleArchive(true, id),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
  })

  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: ["notes", "health"] })
    queryClient.invalidateQueries({ queryKey: ["notes"] })
  }

  const handleBulkArchive = async () => {
    const ids = Array.from(selectedIds)
    await Promise.all(ids.map((id) => archiveMutation.mutateAsync(id)))
    setSelectedIds(new Set())
    refreshAll()
  }

  const handleBulkDelete = async () => {
    const confirmed = window.confirm(
      `Delete ${selectedIds.size} note(s)? This cannot be undone.`
    )
    if (!confirmed) return

    const ids = Array.from(selectedIds)
    await Promise.all(ids.map((id) => deleteMutation.mutateAsync(id)))
    setSelectedIds(new Set())
    refreshAll()
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const openCategory = (key: CategoryKey) => {
    setActiveCategory(key)
    setSelectedIds(new Set())
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl animate-pulse space-y-4">
        <div className="h-8 w-56 rounded bg-gray-100" />
        <div className="h-4 w-72 rounded bg-gray-100" />
        <div className="mt-6 space-y-2">
          <div className="h-16 rounded-xl bg-gray-50" />
          <div className="h-16 rounded-xl bg-gray-50" />
          <div className="h-16 rounded-xl bg-gray-50" />
        </div>
      </div>
    )
  }

  if (isError || !report) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">
            Something went wrong
          </p>
          <p className="mt-1 text-sm text-gray-400">
            We couldn't load your notes health.
          </p>
        </div>
      </div>
    )
  }

  const categories: {
    key: CategoryKey
    label: string
    description: string
    icon: typeof FileQuestion
    items: NoteHealthItem[]
  }[] = [
    {
      key: "untitled",
      label: "Untitled notes",
      description: "Notes with no title",
      icon: FileQuestion,
      items: report.untitled,
    },
    {
      key: "duplicates",
      label: "Duplicate notes",
      description: "Notes sharing the exact same title",
      icon: Copy,
      items: report.duplicates,
    },
    {
      key: "withoutFolder",
      label: "Notes without folder",
      description: "Not organized into any folder",
      icon: FolderX,
      items: report.withoutFolder,
    },
    {
      key: "stale",
      label: "Not opened for 6 months",
      description: "Might be worth archiving",
      icon: Clock,
      items: report.stale,
    },
    {
      key: "veryShort",
      label: "Very short notes",
      description: "Under 20 characters of content",
      icon: AlignLeft,
      items: report.veryShort,
    },
  ]

  const activeCategoryData = categories.find((c) => c.key === activeCategory)

  return (
    <div className="mx-auto w-full max-w-3xl">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
          <Sparkles size={12} strokeWidth={2} />
          Notes health
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Note Cleanup
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          {report.total} total notes. Here's what could use some attention.
        </p>
      </div>

      {!activeCategory ? (
        // Category overview
        <div className="space-y-2">
          {categories.map(({ key, label, description, icon: Icon, items }) => (
            <button
              key={key}
              type="button"
              onClick={() => openCategory(key)}
              disabled={items.length === 0}
              className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left transition hover:border-gray-300 hover:bg-gray-50/50 disabled:cursor-default disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-white"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                <Icon size={17} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {label}
                </p>
                <p className="text-xs text-gray-400">
                  {description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    items.length > 0
                      ? "bg-neutral-900 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {items.length}
                </span>

                {items.length > 0 && (
                  <ChevronRight size={16} strokeWidth={1.8} className="text-gray-300" />
                )}
              </div>
            </button>
          ))}

          {categories.every((c) => c.items.length === 0) && (
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center">
              <p className="text-sm font-medium text-gray-900">
                Your notes are in great shape
              </p>
              <p className="mt-1 text-sm text-gray-400">
                No cleanup needed right now.
              </p>
            </div>
          )}
        </div>
      ) : (
        // Category detail with selection + bulk actions
        <div>
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className="mb-4 text-xs font-medium text-gray-400 transition hover:text-gray-900"
          >
            ← Back to overview
          </button>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-900">
              {activeCategoryData?.label}
              <span className="ml-2 text-gray-400">
                ({activeCategoryData?.items.length})
              </span>
            </h2>

            {selectedIds.size > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {selectedIds.size} selected
                </span>

                <button
                  type="button"
                  onClick={handleBulkArchive}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  <Archive size={13} strokeWidth={1.8} />
                  Archive
                </button>

                <button
                  type="button"
                  onClick={handleBulkDelete}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={13} strokeWidth={1.8} />
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            {activeCategoryData?.items.map((note) => {
              const isSelected = selectedIds.has(note.id)
              const preview = stripHtml(note.content)

              return (
                <div
                  key={note.id}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                    isSelected
                      ? "border-neutral-900 bg-gray-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(note.id)}
                    className="h-4 w-4 shrink-0 rounded border-gray-300 text-neutral-900 focus:ring-gray-300"
                  />

                  <Link
                    href={`/notes/${note.id}`}
                    className="min-w-0 flex-1"
                  >
                    <p className="truncate text-sm font-medium text-gray-900">
                      {note.title || "Untitled"}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {preview || "No additional text"}
                    </p>
                  </Link>

                  <span className="shrink-0 text-[11px] text-gray-400">
                    {formatNoteDate(note.updated_at ?? note.created_at)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}