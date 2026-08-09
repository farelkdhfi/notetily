'use client'

import FormUpdateProfile from '@/features/profiles/components/form-update-profile'
import { getProfile } from '@/lib/api/profiles'
import { useQuery } from '@tanstack/react-query'

export default function ProfilePage() {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-400">
          Loading profile...
        </p>
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load profile.
        </p>
      </div>
    )
  }

  return (
    <FormUpdateProfile profile={profile} />
  )
}