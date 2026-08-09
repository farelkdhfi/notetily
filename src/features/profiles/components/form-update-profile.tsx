'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import z from 'zod'

import { useUpdateProfile } from '@/features/profiles/hooks/use-update-profile'

export const updateProfileSchema = z.object({
  full_name: z
    .string()
    .min(3, 'Nama minimal 3 karakter')
    .max(50, 'Nama maksimal 50 karakter'),

  avatar: z
    .instanceof(File)
    .nullable()
    .optional(),
})

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>

type Profile = {
  full_name: string
  avatar_url: string | null
}

interface ProfileFormProps {
  profile: Profile
}

export default function FormUpdateProfile({
  profile,
}: ProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateProfile = useUpdateProfile()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      full_name: profile.full_name,
      avatar: null,
    },
  })

  const avatar = watch('avatar')

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    profile.avatar_url
  )

  useEffect(() => {
    if (!avatar) {
      setPreviewUrl(profile.avatar_url)
      return
    }

    const url = URL.createObjectURL(avatar)

    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [avatar, profile.avatar_url])

  const onSubmit = (values: UpdateProfileFormValues) => {
    updateProfile.mutate({
      fullName: values.full_name,
      avatar: values.avatar,
    })
  }

  return (
    <div className="mx-auto w-full max-w-3xl">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
          Account
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Profile
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Manage your profile information.
        </p>
      </div>

      {/* Profile Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
      >
        {/* Profile Picture */}
        <div className="border-b border-gray-100 px-7 py-7">
          <div className="flex items-center gap-5">

            {/* Avatar */}
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                className="h-20 w-20 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-100">
                <span className="text-xl font-medium text-gray-400">
                  {profile.full_name
                    .charAt(0)
                    .toUpperCase()}
                </span>
              </div>
            )}

            {/* Avatar info */}
            <div>
              <p className="text-sm font-medium text-gray-900">
                Profile picture
              </p>

              <p className="mt-1 text-xs text-gray-400">
                JPG, PNG or WebP
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file =
                    e.target.files?.[0] ?? null

                  setValue('avatar', file, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }}
              />

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="mt-3 rounded-xl border border-gray-200 px-3.5 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Change photo
              </button>

              {errors.avatar && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.avatar.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="px-7 py-7">
          <div className="mb-5">
            <h2 className="text-sm font-medium text-gray-900">
              Personal information
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Update the name associated with your account.
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="full_name"
              className="mb-2 block text-xs font-medium text-gray-600"
            >
              Full name
            </label>

            <input
              id="full_name"
              {...register('full_name')}
              placeholder="Enter your name"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
            />

            {errors.full_name && (
              <p className="mt-2 text-xs text-red-500">
                {errors.full_name.message}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-7 py-4">
          <div className="flex items-center gap-1.5">
            {updateProfile.isSuccess && (
              <>
                <Check size={13} strokeWidth={2.5} className="text-gray-900" />
                <p className="text-xs text-gray-500">
                  Profile updated
                </p>
              </>
            )}

            {updateProfile.isError && (
              <p className="text-xs text-red-500">
                {updateProfile.error.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={updateProfile.isPending}
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updateProfile.isPending
              ? 'Saving...'
              : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  )
}