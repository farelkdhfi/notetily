"use client"

import Link from "next/link"
import {
  useParams,
  useSearchParams,
} from "next/navigation"

import { formatNoteDate } from "@/lib/utils/format-date"

interface NoteProps {
  note: {
    id: string
    title: string
    content: string
    updated_at: string
    created_at: string
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

  const isDraft =
    (note.title.trim() === "" || note.title.trim() === "Untitled") &&
    note.content.trim() === ""

  const dateLabel = formatNoteDate(note.updated_at ?? note.created_at)

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
          <div className="flex min-w-0 items-center gap-1.5">
            <p className="truncate text-sm font-medium">
              {note.title || "Untitled"}
            </p>

            {isDraft && (
              <span
                className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide ${
                  isActive
                    ? "bg-white/15 text-white/70"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                Draft
              </span>
            )}
          </div>

          <span
            className={`shrink-0 text-[10px] ${
              isActive ? "text-white/50" : "text-gray-400"
            }`}
          >
            {dateLabel}
          </span>
        </div>

        <p
          className={`mt-1 truncate text-xs ${
            isActive ? "text-white/60" : "text-gray-400"
          }`}
        >
          {note.content || "No additional text"}
        </p>
      </div>
    </Link>
  )
}