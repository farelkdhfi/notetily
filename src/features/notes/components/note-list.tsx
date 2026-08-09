"use client"

import { getNotes } from '@/lib/api/notes'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import NoteButton from './note-btn'

type NoteFilter = 'all' | 'favorite' | 'archived'

export default function NoteList() {
  const searchParams = useSearchParams()

  const filter =
    (searchParams.get('filter') as NoteFilter) || 'all'
  const folderId = searchParams.get('folder') ?? undefined

  const {
    data: notes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', filter, folderId],
    queryFn: () => getNotes(filter, folderId),
  })

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="h-12 animate-pulse rounded-xl bg-gray-50" />
        <div className="h-12 animate-pulse rounded-xl bg-gray-50" />
        <div className="h-12 animate-pulse rounded-xl bg-gray-50" />
      </div>
    )
  }

  if (isError) {
    return (
      <p className="px-3 py-4 text-sm text-gray-400">
        Failed to load notes.
      </p>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="px-3 py-8 text-center">
        <p className="text-sm text-gray-400">
          {folderId
            ? 'No notes in this folder.'
            : filter === 'favorite'
              ? 'No favorite notes yet.'
              : filter === 'archived'
                ? 'No archived notes.'
                : 'No notes yet.'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-2">
      {notes.map((note) => (
        <NoteButton
          key={note.id}
          note={note}
        />
      ))}
    </div>
  )
}