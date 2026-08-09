
'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Plus, User } from 'lucide-react'

import CreateNotesModal from '@/features/notes/components/create-notes-modal'
import { LogoutButton } from '@/features/auth/components/logout-btn'

type NoteFilter = 'all' | 'favorite' | 'archived'

export default function FirstSidebar() {
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentFilter =
    (searchParams.get('filter') as NoteFilter) || 'all'

  const handleFilterChange = (filter: NoteFilter) => {
    if (filter === 'all') {
      router.push('/notes')
      return
    }

    router.push(`/notes?filter=${filter}`)
  }

  const getNavClass = (filter: NoteFilter) => {
    const isActive = currentFilter === filter

    return `w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
      isActive
        ? 'bg-neutral-900 font-medium text-white'
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`
  }

  return (
    <>
      <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-gray-100 bg-neutral-100 px-4 py-6">

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
          onClick={() => setIsCreateNoteOpen(true)}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-900 bg-white transition hover:bg-gray-100"
        >
          <Plus
            size={17}
            strokeWidth={2}
          />

          <span>
            New note
          </span>
        </button>

        {/* Navigation */}
        <nav className="mt-5 space-y-1">

          {/* All Notes */}
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={getNavClass('all')}
          >
            All Notes
          </button>

          {/* Favorites */}
          <button
            type="button"
            onClick={() => handleFilterChange('favorite')}
            className={getNavClass('favorite')}
          >
            Favorites
          </button>

          {/* Archive */}
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
          <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
            Folders
          </p>

          <nav className="space-y-1">
            <button
              type="button"
              className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
            >
              Personal
            </button>

            <button
              type="button"
              className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
            >
              Work
            </button>

            <button
              type="button"
              className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
            >
              Ideas
            </button>
          </nav>
        </div>

        {/* Account */}
        <div className="mt-10">
          <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
            Account
          </p>

          <nav className="space-y-1">
            <Link
              href="/profiles"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
            >
              <User
                size={16}
                strokeWidth={1.8}
              />

              <span>
                Profile
              </span>
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <div className="mt-auto border-t border-gray-100 pt-4">
          <LogoutButton />
        </div>
      </aside>

      {/* Create Note Modal */}
      <CreateNotesModal
        open={isCreateNoteOpen}
        onClose={() => setIsCreateNoteOpen(false)}
      />
    </>
  )
}