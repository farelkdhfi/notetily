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
      <div className="mx-auto w-full max-w-3xl animate-pulse">
        <div className="mb-8">
          <div className="h-3 w-16 rounded bg-gray-100" />
          <div className="mt-3 h-8 w-32 rounded bg-gray-100" />
          <div className="mt-3 h-4 w-56 rounded bg-gray-100" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <div className="border-b border-gray-100 px-7 py-7">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 shrink-0 rounded-full bg-gray-100" />
              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-gray-100" />
                <div className="h-3 w-36 rounded bg-gray-100" />
              </div>
            </div>
          </div>

          <div className="px-7 py-7">
            <div className="h-4 w-40 rounded bg-gray-100" />
            <div className="mt-5 h-11 w-full rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">
            Something went wrong
          </p>
          <p className="mt-1 text-sm text-gray-400">
            We couldn't load your profile.
          </p>
        </div>
      </div>
    )
  }

  return (
    <FormUpdateProfile profile={profile} />
  )
}