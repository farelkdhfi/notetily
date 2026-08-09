'use client'

import { FolderPlus, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import z from 'zod'

import { createFolder } from '@/lib/api/folders'

interface CreateFolderModalProps {
  open: boolean
  onClose: () => void
}

const createFolderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Folder name is required')
    .min(3, 'Folder name must be at least 3 characters')
    .max(50, 'Folder name must be less than 50 characters'),
})

type CreateFolderFormValues = z.infer<typeof createFolderSchema>

export default function CreateFolderModal({
  open,
  onClose,
}: CreateFolderModalProps) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFolderFormValues>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: '',
    },
  })

  const {
    mutate,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createFolder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['folders'],
      })

      reset()
      onClose()
    },
  })

  const onSubmit = (values: CreateFolderFormValues) => {
    mutate({
      name: values.name,
    })
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  if (!open) return null

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
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
              <FolderPlus size={16} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-[15px] font-semibold tracking-tight text-gray-900">
                Create folder
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Organize your notes into a new folder.
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

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5"
        >
          <label
            htmlFor="folder-name"
            className="mb-2 block text-xs font-medium text-gray-700"
          >
            Folder name
          </label>

          <input
            id="folder-name"
            type="text"
            placeholder="e.g. Work, Ideas, Personal"
            autoFocus
            disabled={isPending}
            {...register('name')}
            className={`w-full rounded-xl border bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
              errors.name
                ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
            } disabled:cursor-not-allowed disabled:opacity-60`}
          />

          {errors.name && (
            <p className="mt-2 text-xs text-red-500">
              {errors.name.message}
            </p>
          )}

          {isError && (
            <p className="mt-2 text-xs text-red-500">
              Failed to create folder. Please try again.
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
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? 'Creating...' : 'Create folder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}