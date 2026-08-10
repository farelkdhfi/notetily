"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, User, Lock } from "lucide-react"

import { previewFolders } from "@/lib/data/preview-notes"
import { usePreviewContext } from "@/features/preview/context/preview-context"

export default function PreviewSidebar() {
  const router = useRouter()
  const { filter, folderId, setFilter, setFolderId, setSelectedNoteId } =
    usePreviewContext()

  const getNavClass = (f: "all" | "favorite" | "archived") => {
    const isActive = filter === f && !folderId

    return `w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${isActive
      ? "bg-neutral-900 font-medium text-white"
      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`
  }

  const getFolderClass = (id: string) => {
    const isActive = folderId === id

    return `w-full rounded-xl px-3 py-2 text-left text-sm transition ${isActive
      ? "bg-neutral-900 font-medium text-white"
      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-gray-100 bg-white px-3 py-6">
      {/* Logo */}
      <div className="mb-8 px-3">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-gray-900"
        >
          Notetily.
        </Link>
      </div>

      {/* New Note (disabled, redirect to signup) */}
      <button
        type="button"
        onClick={() => router.push("/signup")}
        title="Sign up to create notes"
        className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm border border-black/30 font-medium text-gray-900 bg-white transition hover:bg-gray-100"
      >
        <span className="flex items-center gap-2">
          <Plus size={17} strokeWidth={2} />
          New note
        </span>
        <Lock size={13} strokeWidth={2} className="text-gray-300" />
      </button>

      {/* Navigation */}
      <nav className="mt-5 space-y-1">
        <button
          type="button"
          onClick={() => {
            setFilter("all")
            setFolderId(null)
            setSelectedNoteId(null)
          }}
          className={getNavClass("all")}
        >
          All Notes
        </button>

        <button
          type="button"
          onClick={() => {
            setFilter("favorite")
            setFolderId(null)
            setSelectedNoteId(null)
          }}
          className={getNavClass("favorite")}
        >
          Favorites
        </button>

        <button
          type="button"
          onClick={() => {
            setFilter("archived")
            setFolderId(null)
            setSelectedNoteId(null)
          }}
          className={getNavClass("archived")}
        >
          Archive
        </button>
      </nav>

      {/* Folders */}
      <div className="mt-10">
        <div className="mb-3 flex items-center justify-between px-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
            Folders
          </p>
        </div>

        <nav className="space-y-1">
          {previewFolders.map((folder) => (
            <button
              key={folder.id}
              type="button"
              onClick={() => {
                setFolderId(folder.id)
                setFilter("all")
                setSelectedNoteId(null)
              }}
              className={getFolderClass(folder.id)}
            >
              {folder.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Account (disabled, redirect to signup) */}
      <div className="mt-10">
        <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
          Account
        </p>

        <nav className="space-y-1">
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-gray-400"
          >
            <User size={16} strokeWidth={1.8} />
            <span>Profile</span>
          </button>
        </nav>
      </div>

      {/* Sign up CTA instead of logout */}
      <div className="mt-auto border-t border-gray-100 pt-4">
        <Link
          href="/signup"
          className="flex w-full items-center justify-center rounded-xl bg-neutral-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Sign up for free
        </Link>
      </div>
    </aside>
  )
}