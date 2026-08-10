"use client"

import { previewNotes } from "@/lib/data/preview-notes"
import { usePreviewContext } from "@/features/preview/context/preview-context"
import { stripHtml } from "@/lib/utils/strip-html"
import { formatNoteDate } from "@/lib/utils/format-date"

export default function PreviewSecondSidebar() {
  const { filter, folderId, selectedNoteId, setSelectedNoteId } =
    usePreviewContext()

  const filteredNotes = previewNotes.filter((note) => {
    if (folderId) return note.folder_id === folderId

    if (filter === "favorite") return note.is_favorite && !note.is_archived
    if (filter === "archived") return note.is_archived

    return !note.is_archived
  })

  const label = folderId
    ? "Folder"
    : filter === "favorite"
      ? "Favorites"
      : filter === "archived"
        ? "Archive"
        : "Notes"

  return (
    <aside className="w-[240px] shrink-0 border-r border-gray-200 bg-white p-5 text-black">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{label}</h2>
        <span className="text-xs text-gray-400">
          {filteredNotes.length} notes
        </span>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="px-1 py-8 text-center">
          <p className="text-sm text-gray-400">No notes here.</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {filteredNotes.map((note) => {
            const isActive = selectedNoteId === note.id
            const preview = stripHtml(note.content)

            return (
              <button
                key={note.id}
                type="button"
                onClick={() => setSelectedNoteId(note.id)}
                className={`w-full rounded-lg p-3 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-neutral-800 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">
                    {note.title}
                  </p>
                  <span
                    className={`shrink-0 text-[10px] ${
                      isActive ? "text-white/50" : "text-gray-400"
                    }`}
                  >
                    {formatNoteDate(note.updated_at)}
                  </span>
                </div>

                <p
                  className={`mt-1 truncate text-xs ${
                    isActive ? "text-white/60" : "text-gray-400"
                  }`}
                >
                  {preview}
                </p>
              </button>
            )
          })}
        </div>
      )}
    </aside>
  )
}