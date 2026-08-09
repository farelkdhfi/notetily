import { FileText, Plus } from 'lucide-react'
import Link from 'next/link'

export default function NotePage() {
  return (
    <div className="flex h-full min-h-[calc(100vh-80px)] items-center justify-center">
      <div className="flex max-w-md flex-col items-center text-center">

        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <FileText
            size={28}
            strokeWidth={1.5}
            className="text-gray-400"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Nothing here yet
        </h1>

        {/* Description */}
        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
          Start capturing your thoughts, ideas, and
          everything you want to remember.
        </p>

        {/* Action */}
        <Link
          href="/notes/new"
          className="mt-7 flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-[0.98]"
        >
          <Plus size={16} />
          Create your first note
        </Link>

        {/* Hint */}
        <p className="mt-5 text-xs text-gray-300">
          Your notes will appear here.
        </p>
      </div>
    </div>
  )
}