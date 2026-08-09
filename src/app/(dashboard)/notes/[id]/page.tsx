// NoteDetailPage.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { MoreHorizontal, FolderClosed } from "lucide-react"

import { getNoteById } from "@/lib/api/notes"
import { getFolder } from "@/lib/api/folders"
import ToggleFavoriteNotes from "@/features/notes/components/toggle-favorite-notes"
import ButtonDeleteNote from "@/features/notes/components/btn-delete"
import ToggleArchiveNotes from "@/features/notes/components/toggle-archive-notes"
import ModalListFolder from "@/features/folders/components/modal-list-folder"

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const folderRef = useRef<HTMLDivElement>(null)

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
  })

  const { data: folders } = useQuery({
    queryKey: ["folders"],
    queryFn: getFolder,
  })

  const currentFolder = folders?.find(
    (folder) => folder.id === note?.folder_id
  )

  // Close menu / folder modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }

      if (
        folderRef.current &&
        !folderRef.current.contains(event.target as Node)
      ) {
        setIsFolderModalOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl animate-pulse">
        <div className="h-10 w-2/3 rounded bg-gray-100" />
        <div className="mt-4 h-4 w-32 rounded bg-gray-100" />
        <div className="mt-12 space-y-3">
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-5/6 rounded bg-gray-100" />
          <div className="h-4 w-4/6 rounded bg-gray-100" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">
            Something went wrong
          </p>
          <p className="mt-1 text-sm text-gray-400">
            We couldn't load this note.
          </p>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">
            Note not found
          </p>
          <p className="mt-1 text-sm text-gray-400">
            This note may have been deleted.
          </p>
        </div>
      </div>
    )
  }

  return (
    <article className="mx-auto w-full max-w-3xl bg-white">

      {/* Top bar */}
      <div className="mb-10 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
            Note
          </span>

          {/* Folder badge */}
          <span
            className={`ml-1 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition ${
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
          {/* Add to folder */}
          <div ref={folderRef} className="relative">
            <button
              type="button"
              onClick={() => setIsFolderModalOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Add to folder"
              title="Add to folder"
            >
              <FolderClosed size={17} strokeWidth={1.8} />
            </button>

            {isFolderModalOpen && (
              <ModalListFolder
                noteId={note.id}
                onSelect={() => setIsFolderModalOpen(false)}
              />
            )}
          </div>

          {/* More Menu */}
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-white transition hover:bg-neutral-600"
            >
              <MoreHorizontal size={18} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-11 z-50 w-48 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-black/5">
                {/* Favorite */}
                <div
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl transition hover:bg-gray-50"
                >
                  <ToggleFavoriteNotes note={note} />
                </div>

                {/* Archive */}
                <div
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl transition hover:bg-gray-50"
                >
                  <ToggleArchiveNotes note={note} />
                </div>

                <div className="my-1 h-px bg-gray-100" />

                {/* Delete */}
                <div
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl transition hover:bg-red-50"
                >
                  <ButtonDeleteNote id={note.id} />
                </div>
              </div>
            )}
          </div>
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
          <span>Updated recently</span>
        </div>
      </header>

      <div className="my-10 h-px bg-gray-100" />

      <div className="max-w-2xl">
        <p className="whitespace-pre-wrap text-[17px] leading-8 text-gray-600">
          {note.content}
        </p>
      </div>

      <div className="mt-16 border-t border-gray-100 pt-5">
        <p className="text-xs text-gray-300">End of note</p>
      </div>
    </article>
  )
}