"use client"

import Link from "next/link"
import {
  useParams,
  useSearchParams,
} from "next/navigation"

interface NoteProps {
  note: {
    id: string
    title: string
    content: string
  }
}

export default function NoteButton({ note }: NoteProps) {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()

  const isActive = params.id === note.id

  const filter = searchParams.get("filter")
  const folderId = searchParams.get("folder")

  const query = new URLSearchParams()
  if (filter) query.set("filter", filter)
  if (folderId) query.set("folder", folderId)

  const queryString = query.toString()
  const href = queryString
    ? `/notes/${note.id}?${queryString}`
    : `/notes/${note.id}`

  return (
    <Link href={href}>
      <div
        className={`rounded-lg p-3 transition-all duration-500 ${
          isActive
            ? "bg-neutral-800 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">
            {note.title}
          </p>

          <span className="shrink-0 text-[10px] text-gray-400">
            Aug 4
          </span>
        </div>

        <p className="mt-1 truncate text-xs text-gray-400">
          {note.content}
        </p>
      </div>
    </Link>
  )
}