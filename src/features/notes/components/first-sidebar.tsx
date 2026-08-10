'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Plus, User, Trash2, Sparkles, Sunrise, Waypoints, Search } from 'lucide-react'

import { LogoutButton } from '@/features/auth/components/logout-btn'
import { useQuery } from '@tanstack/react-query'
import { getFolder } from '@/lib/api/folders'
import CreateFolderModal from '@/features/folders/components/create-folder'
import DeleteFolderModal from '@/features/folders/components/delete-folder-modal'
import GlobalSearch from './global-search'

type NoteFilter = 'all' | 'favorite' | 'archived'

export default function FirstSidebar() {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [folderToDelete, setFolderToDelete] = useState<{
    id: string
    name: string
  } | null>(null)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isNotesPage = pathname === '/notes' || pathname.startsWith('/notes/')

  const currentFilter = (searchParams.get('filter') as NoteFilter) || 'all'
  const currentFolderId = searchParams.get('folder')

  const isProfileActive = pathname === '/profiles'
  const isTodayActive = pathname === '/notes/today'
  const isGraphActive = pathname === '/notes/graph'


  const handleFilterChange = (filter: NoteFilter) => {
    const params = new URLSearchParams(searchParams.toString())

    if (filter === 'all') {
      params.delete('filter')
    } else {
      params.set('filter', filter)
    }

    params.delete('folder')

    const query = params.toString()
    router.push(query ? `/notes?${query}` : '/notes')
  }

  const handleFolderChange = (folderId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('folder', folderId)
    params.delete('filter')

    router.push(`/notes?${params.toString()}`)
  }

  const getNavClass = (filter: NoteFilter) => {
    const isActive = isNotesPage && currentFilter === filter && !currentFolderId

    return `w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${isActive
      ? 'bg-neutral-900 font-medium text-white'
      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`
  }

  const getFolderClass = (folderId: string) => {
    const isActive = isNotesPage && currentFolderId === folderId

    return `flex-1 truncate rounded-xl px-3 py-2 text-left text-sm transition ${isActive
      ? 'bg-neutral-900 font-medium text-white'
      : 'text-gray-500 group-hover:text-gray-900'
      }`
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ['folders'],
    queryFn: getFolder
  })

  const handleDeleteClick = (
    e: React.MouseEvent,
    folderId: string,
    folderName: string
  ) => {
    e.stopPropagation()
    e.preventDefault()

    setFolderToDelete({ id: folderId, name: folderName })
  }

  return (
    <>
      <aside className="flex h-screen w-64 flex-col border-r border-gray-100 bg-white px-3 py-6">
        {/* Logo */}
        <div className="mb-8 px-3">
          <Link
            href="/notes"
            className="text-lg font-semibold tracking-tight text-gray-900"
          >
            Notetily.
          </Link>
        </div>

        {/* New Note */}
        <button
          type="button"
          onClick={() => router.push('/notes/new')}
          className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm border border-black/30 font-medium text-gray-900 bg-white transition hover:bg-gray-100"
        >
          <span className="flex items-center gap-2">
            <Plus size={17} strokeWidth={2} />
            New note
          </span>

          <kbd className="rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
            ⌘K
          </kbd>
        </button>

        {/* Navigation */}
        <nav className="mt-5 space-y-1">

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-gray-400 transition hover:bg-gray-50 hover:text-gray-900"
          >
            <Search size={16} strokeWidth={1.8} />
            <span>Search notes...</span>
          </button>

          <Link
            href="/notes/today"
            className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition ${isTodayActive
              ? 'bg-neutral-900 font-medium text-white'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <Sunrise size={16} strokeWidth={1.8} />
            <span>Today</span>
          </Link>

          <Link
            href="/notes/graph"
            className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition ${isGraphActive
              ? 'bg-neutral-900 font-medium text-white'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <Waypoints size={16} strokeWidth={1.8} />
            <span>Graph</span>
          </Link>

          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={getNavClass('all')}
          >
            All Notes
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange('favorite')}
            className={getNavClass('favorite')}
          >
            Favorites
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange('archived')}
            className={getNavClass('archived')}
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

            <button
              type="button"
              onClick={() => setIsCreateFolderOpen(true)}
              className="flex h-5 w-5 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Add folder"
              title="Add folder"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          </div>
          <nav className="space-y-1">
            {isLoading && (
              <p className="px-3 text-xs text-gray-400">Loading...</p>
            )}

            {isError && (
              <p className="px-3 text-xs text-red-400">Failed to load folders</p>
            )}

            {data?.map(folder => (
              <div
                key={folder.id}
                className="group flex items-center gap-1"
              >
                <button
                  type="button"
                  onClick={() => handleFolderChange(folder.id)}
                  className={getFolderClass(folder.id)}
                >
                  {folder.name}
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDeleteClick(e, folder.id, folder.name)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-300 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                  aria-label={`Delete folder ${folder.name}`}
                  title="Delete folder"
                >
                  <Trash2 size={13} strokeWidth={1.8} />
                </button>
              </div>
            ))}
          </nav>
        </div>

        {/* Account */}
        <div className="mt-10">
          <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
            Account
          </p>

          <nav className="space-y-1">

            <Link
              href="/notes/cleanup"
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${pathname === '/notes/cleanup'
                ? 'bg-neutral-900 font-medium text-white'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <Sparkles size={16} strokeWidth={1.8} />
              <span>Cleanup</span>
            </Link>

            <Link
              href="/profiles"
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${isProfileActive
                ? 'bg-neutral-900 font-medium text-white'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <User size={16} strokeWidth={1.8} />
              <span>Profile</span>
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <div className="mt-auto border-t border-gray-100 pt-4">
          <LogoutButton />
        </div>
      </aside>

      <CreateFolderModal
        open={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
      />

      <GlobalSearch
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <DeleteFolderModal
        open={folderToDelete !== null}
        folderId={folderToDelete?.id ?? null}
        folderName={folderToDelete?.name ?? null}
        onClose={() => setFolderToDelete(null)}
      />
    </>
  )
}