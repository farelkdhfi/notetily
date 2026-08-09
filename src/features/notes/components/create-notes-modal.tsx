"use client"

import CreateNotes from './create-notes'

type CreateNotesModalProps = {
  open: boolean
  onClose: () => void
}

export default function CreateNotesModal({
  open,
  onClose,
}: CreateNotesModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-3xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute -right-2 -top-12 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition hover:text-black"
          >
            ×
          </button>

          <CreateNotes onClose={onClose} />
        </div>
      </div>
    </div>
  )
}