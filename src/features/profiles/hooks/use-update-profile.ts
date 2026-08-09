// hooks/use-update-profile.ts

import { updateProfile } from '@/lib/api/profiles'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      fullName,
      avatar,
    }: {
      fullName: string
      avatar?: File | null
    }) => updateProfile(fullName, avatar ?? null),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profiles'],
      })
    },
  })
}