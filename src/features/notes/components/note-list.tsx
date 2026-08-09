"use client"

import { useEffect } from 'react'
import { getNotes } from '@/lib/api/notes'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import NoteButton from './note-btn'

type NoteFilter = 'all' | 'favorite' | 'archived'

interface NoteListProps {
  onCountChange?: (count: number) => void
}

export default function NoteList({ onCountChange }: NoteListProps) {
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

  useEffect(() => {
    if (!isLoading && !isError) {
      onCountChange?.(notes.length)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes.length, isLoading, isError])

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