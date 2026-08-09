"use client"

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import NoteList from './note-list'

type NoteFilter = 'all' | 'favorite' | 'archived'

export default function SecondSidebar() {
  const [noteCount, setNoteCount] = useState<number | null>(null)

  const searchParams = useSearchParams()
  const filter = (searchParams.get('filter') as NoteFilter) || 'all'
  const folderId = searchParams.get('folder')

  const label =
    filter === 'favorite'
      ? 'Favorites'
      : filter === 'archived'
        ? 'Archive'
        : folderId
          ? 'Folder'
          : 'Notes'

  return (
    <aside className="w-[240px] shrink-0 bg-white border-r text-black border-gray-200 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {label}
        </h2>

        <span className="text-xs text-gray-400">
          {noteCount === null
            ? '...'
            : `${noteCount} ${noteCount === 1 ? 'note' : 'notes'}`}
        </span>
      </div>

      <div>
        <NoteList onCountChange={setNoteCount} />
      </div>
    </aside>
  )
}