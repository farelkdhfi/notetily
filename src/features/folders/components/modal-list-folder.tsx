// modal-list-folder.tsx
import { getFolder } from '@/lib/api/folders'
import { useQuery } from '@tanstack/react-query'

import AddNoteToFolderButton from './btn-add-note-to-folder'

export default function ModalListFolder({
  noteId,
  onSelect,
}: {
  noteId: string
  onSelect?: () => void
}) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['folders'],
    queryFn: getFolder,
  })

  return (
    <div className="absolute right-0 top-11 z-50 w-52 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-black/5">
      <p className="px-2 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
        Move to folder
      </p>

      {isLoading && (
        <div className="space-y-1 px-2 py-1">
          <div className="h-8 animate-pulse rounded-lg bg-gray-50" />
          <div className="h-8 animate-pulse rounded-lg bg-gray-50" />
        </div>
      )}

      {isError && (
        <p className="px-2 py-2 text-xs text-gray-400">
          Couldn't load folders.
        </p>
      )}

      {!isLoading && !isError && data?.length === 0 && (
        <p className="px-2 py-2 text-xs text-gray-400">
          No folders yet.
        </p>
      )}

      <div className="space-y-0.5">
        {data?.map((folder) => (
          <AddNoteToFolderButton
            key={folder.id}
            folderName={folder.name}
            folderId={folder.id}
            noteId={noteId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}