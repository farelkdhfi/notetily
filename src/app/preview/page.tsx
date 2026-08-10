"use client"

import { useEffect } from "react"
import { Lock, Heart, Archive, MoreHorizontal, FolderClosed } from "lucide-react"

import { previewNotes, previewFolders } from "@/lib/data/preview-notes"
import { usePreviewContext } from "@/features/preview/context/preview-context"

export default function PreviewPage() {
  const { filter, folderId, selectedNoteId, setSelectedNoteId } =
    usePreviewContext()

  const filteredNotes = previewNotes.filter((note) => {
    if (folderId) return note.folder_id === folderId
    if (filter === "favorite") return note.is_favorite && !note.is_archived
    if (filter === "archived") return note.is_archived
    return !note.is_archived
  })

  // Auto-select note pertama, sama seperti /notes asli
  useEffect(() => {
    if (!selectedNoteId && filteredNotes.length > 0) {
      setSelectedNoteId(filteredNotes[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredNotes, selectedNoteId])

  const note = previewNotes.find((n) => n.id === selectedNoteId)
  const currentFolder = previewFolders.find((f) => f.id === note?.folder_id)

  if (!note) {
    return (
      <div className="flex h-full items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">
            No notes here.
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Try another category from the sidebar.
          </p>
        </div>
      </div>
    )
  }

  return (
    <article className="mx-auto w-full max-w-3xl">
      {/* Top bar */}
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
            Note
          </span>

          <span
            className={`ml-1 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              currentFolder
                ? "bg-neutral-900 text-white"
                : "bg-gray-50 text-gray-400"
            }`}
          >
            <FolderClosed size={12} strokeWidth={2} />
            {currentFolder ? currentFolder.name : "No folder"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Aksi-aksi ini semua disabled, cuma nunjukin UI-nya doang */}
          <button
            type="button"
            disabled
            title="Sign up to unlock this"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300"
          >
            <Heart size={17} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            disabled
            title="Sign up to unlock this"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300"
          >
            <Archive size={17} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            disabled
            title="Sign up to unlock this"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-300"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Title */}
      <header>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900">
          {note.title}
        </h1>

        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
          <span>Note</span>
          <span>·</span>
          <span>Sample</span>
        </div>
      </header>

      <div className="my-10 h-px bg-gray-100" />

      {/* Content (read-only render) */}
      <div
        className="prose prose-sm max-w-2xl text-[17px] leading-8 text-gray-600 [&_strong]:text-gray-900 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_blockquote]:border-l-2 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_blockquote]:text-gray-500 [&_blockquote]:italic"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      {/* Bottom CTA */}
      <div className="mt-16 rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-5 text-center">
        <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-900">
          <Lock size={14} strokeWidth={2} />
          This is a preview
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Sign up to create, edit, and organize your own notes.
        </p>
      </div>
    </article>
  )
}