"use client"

import { createNotes } from '@/lib/api/notes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

const createNoteSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(18, 'Title must be at most 18 characters'),

  content: z
    .string()
    .min(3, 'Content must be at least 3 characters')
    .max(1000, 'Content must be at most 1000 characters'),
})

type CreateNoteSchemaValues = z.infer<typeof createNoteSchema>

export default function CreateNotes({onClose}: {onClose: () => void}) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoteSchemaValues>({
    resolver: zodResolver(createNoteSchema),
  })

  const addMutation = useMutation({
    mutationFn: createNotes,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      })
      onClose()
    },
  })

  const onSubmit = (values: CreateNoteSchemaValues) => {
    addMutation.mutate(values)
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <span className="text-sm font-medium text-neutral-400">
            New Note
          </span>

          <button
            type="submit"
            disabled={addMutation.isPending}
            className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {addMutation.isPending ? 'Saving...' : 'Save'}
          </button>
        </div>

        {/* Editor */}
        <div className="px-7 py-8">
          {/* Title */}
          <div>
            <input
              {...register('title')}
              placeholder="Title"
              autoComplete="off"
              className="w-full border-none bg-transparent text-3xl font-semibold tracking-tight text-neutral-900 outline-none placeholder:text-neutral-300"
            />

            {errors.title && (
              <p className="mt-2 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="mt-6">
            <textarea
              {...register('content')}
              placeholder="Start writing..."
              rows={12}
              className="w-full resize-none border-none bg-transparent text-[17px] leading-8 text-neutral-700 outline-none placeholder:text-neutral-300"
            />

            {errors.content && (
              <p className="mt-2 text-sm text-red-500">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-100 px-7 py-3">
          <p className="text-xs text-neutral-400">
            Your note is saved securely.
          </p>
        </div>
      </form>
    </div>
  )
}
