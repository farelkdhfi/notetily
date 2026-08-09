// btn-add-note-to-folder.tsx
import { addNoteToFolder } from '@/lib/api/notes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FolderClosed, Check } from 'lucide-react'

export default function AddNoteToFolderButton({
  noteId,
  folderId,
  folderName,
  onSelect,
}: {
  noteId: string
  folderId: string
  folderName: string
  onSelect?: () => void
}) {
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: ({
      noteId,
      folderId,
    }: {
      noteId: string
      folderId: string
    }) => addNoteToFolder(noteId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['note', noteId] })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      onSelect?.()
    },
  })

  return (
    <button
      type="button"
      onClick={() => addMutation.mutate({ noteId, folderId })}
      disabled={addMutation.isPending}
      className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50"
    >
      <span className="flex items-center gap-2 truncate">
        <FolderClosed size={14} strokeWidth={1.8} className="shrink-0 text-gray-400" />
        <span className="truncate">{folderName}</span>
      </span>

      {addMutation.isSuccess && (
        <Check size={14} strokeWidth={2} className="shrink-0 text-gray-900" />
      )}
    </button>
  )
}