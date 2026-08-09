'use client'

import { AlertTriangle, X } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

import { deleteFolder } from '@/lib/api/folders'

interface DeleteFolderModalProps {
  open: boolean
  folderId: string | null
  folderName: string | null
  onClose: () => void
}

export default function DeleteFolderModal({
  open,
  folderId,
  folderName,
  onClose,
}: DeleteFolderModalProps) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentFolderId = searchParams.get('folder')

  const {
    mutate,
    isPending,
    isError,
  } = useMutation({
    mutationFn: deleteFolder,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] })
      queryClient.invalidateQueries({ queryKey: ['notes'] })

      if (currentFolderId === folderId) {
        router.push('/notes')
      }

      onClose()
    },
  })

  const handleClose = () => {
    if (isPending) return
    onClose()
  }

  const handleConfirm = () => {
    if (folderId) {
      mutate(folderId)
    }
  }

  if (!open || !folderId) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 backdrop-blur-[2px]"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <AlertTriangle size={16} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-[15px] font-semibold tracking-tight text-gray-900">
                Delete folder
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-sm leading-6 text-gray-600">
            Are you sure you want to delete{' '}
            <span className="font-medium text-gray-900">
              &ldquo;{folderName}&rdquo;
            </span>
            ? Notes inside this folder will move to All Notes — they
            won&apos;t be deleted.
          </p>

          {isError && (
            <p className="mt-3 text-xs text-red-500">
              Failed to delete folder. Please try again.
            </p>
          )}

          {/* Actions */}
          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={isPending}
              className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? 'Deleting...' : 'Delete folder'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}