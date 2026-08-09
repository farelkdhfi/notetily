'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { signUpSchema, SignUpFormValues } from '@/lib/schemas/auth'
import { signUp } from '@/lib/api/auth'

export function SignUpForm() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '' },
  })

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert('Check your email to confirm your account!')
      form.reset()
    },
  })

  return (
    <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="flex flex-col gap-3">
      <input {...form.register('email')} placeholder="Email" className="border p-2 rounded" />
      {form.formState.errors.email && (
        <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
      )}

      <input {...form.register('password')} type="password" placeholder="Password" className="border p-2 rounded" />
      {form.formState.errors.password && (
        <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
      )}

      <button type="submit" disabled={mutation.isPending} className="bg-black text-white p-2 rounded disabled:opacity-50">
        {mutation.isPending ? 'Signing up...' : 'Sign Up'}
      </button>
      {mutation.isError && <p className="text-red-500 text-sm">{mutation.error.message}</p>}
    </form>
  )
}