"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { NotebookPen, Plus } from "lucide-react"

import { getNotes } from "@/lib/api/notes"

type NoteFilter = 'all' | 'favorite' | 'archived'

export default function NotesLandingPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const filter = (searchParams.get('filter') as NoteFilter) || 'all'
  const folderId = searchParams.get('folder') ?? undefined

  const { data: notes, isLoading, isError } = useQuery({
    queryKey: ['notes', filter, folderId],
    queryFn: () => getNotes(filter, folderId),
  })

  // Auto-select note pertama begitu data notes tersedia
  useEffect(() => {
    if (notes && notes.length > 0) {
      const params = new URLSearchParams(searchParams.toString())
      const query = params.toString()

      router.replace(`/notes/${notes[0].id}${query ? `?${query}` : ''}`)
    }
  }, [notes, router, searchParams])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-sm animate-pulse space-y-3">
          <div className="h-4 w-1/2 rounded bg-gray-100" />
          <div className="h-3 w-full rounded bg-gray-100" />
          <div className="h-3 w-2/3 rounded bg-gray-100" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">
            Something went wrong
          </p>
          <p className="mt-1 text-sm text-gray-400">
            We couldn't load your notes.
          </p>
        </div>
      </div>
    )
  }

  // notes.length > 0 akan langsung redirect lewat useEffect,
  // jadi state ini hanya muncul sesaat sebelum redirect,
  // atau saat notes benar-benar kosong.
  if (notes && notes.length > 0) {
    return null
  }

  const emptyMessage =
    folderId
      ? "This folder is empty."
      : filter === 'favorite'
        ? "No favorite notes yet."
        : filter === 'archived'
          ? "No archived notes."
          : "You don't have any notes yet."

  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-300">
          <NotebookPen size={24} strokeWidth={1.5} />
        </div>

        <p className="text-sm font-medium text-gray-900">
          {emptyMessage}
        </p>

        <p className="mt-1.5 text-sm leading-6 text-gray-400">
          {filter === 'all' && !folderId
            ? "Start capturing your thoughts. Your first note is one click away."
            : "Notes you create here will show up in this view."}
        </p>

        {filter === 'all' && !folderId && (
          <button
            type="button"
            onClick={() => router.push('/notes/new')}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            <Plus size={15} strokeWidth={2} />
            Create your first note
          </button>
        )}
      </div>
    </div>
  )
}