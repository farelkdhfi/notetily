'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'

import { logout } from '@/lib/api/auth'

export function LogoutButton() {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      router.push('/signin')
      router.refresh()
    },
  })

  return (
    <button
      type="button"
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LogOut
        size={17}
        strokeWidth={1.8}
      />

      <span>
        {mutation.isPending ? 'Logging out...' : 'Log out'}
      </span>
    </button>
  )
}