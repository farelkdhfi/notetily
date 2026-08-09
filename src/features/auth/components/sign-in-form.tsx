'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import {
  SignInFormValues,
  signInSchema,
} from '@/lib/schemas/auth'

import { login } from '@/lib/api/auth'

export function SignInForm() {
  const router = useRouter()

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: login,

    onSuccess: () => {
      router.push('/notes')
      router.refresh()
    },
  })

  const onSubmit = (values: SignInFormValues) => {
    mutation.mutate(values)
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      <div className="mx-auto flex min-h-screen max-w-7xl">

        {/* Left - Brand / Visual */}
        <div className="relative hidden w-1/2 overflow-hidden p-6 lg:block">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] bg-[#111111] p-10 text-white">

            {/* Decorative circles */}
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/[0.04]" />

            <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-white/[0.03]" />

            {/* Logo */}
            <div className="relative z-10">
              <Link
                href="/"
                className="text-xl font-semibold tracking-tight"
              >
                Notetily.
              </Link>
            </div>

            {/* Main message */}
            <div className="relative z-10 max-w-lg">
              <p className="mb-5 text-sm font-medium text-white/40">
                YOUR THOUGHTS, SIMPLIFIED.
              </p>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight">
                Everything you need.
                <br />
                Nothing you don't.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-white/50">
                Capture ideas, organize your thoughts, and
                keep everything that matters in one simple
                place.
              </p>
            </div>

            {/* Bottom */}
            <div className="relative z-10 flex items-center justify-between text-xs text-white/30">
              <span>© 2026 Notetily.</span>
              <span>Simple. Focused. Yours.</span>
            </div>
          </div>
        </div>

        {/* Right - Login */}
        <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-16">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-12 lg:hidden">
              <Link
                href="/"
                className="text-xl font-semibold tracking-tight text-black"
              >
                Notes.
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-10">
              <p className="mb-3 text-sm font-medium text-neutral-400">
                WELCOME BACK
              </p>

              <h2 className="text-4xl font-semibold tracking-tight text-neutral-900">
                Sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Continue where you left off.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...form.register('email')}
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100"
                />

                {form.formState.errors.email && (
                  <p className="mt-2 text-xs text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-neutral-400 transition hover:text-neutral-900"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...form.register('password')}
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100"
                />

                {form.formState.errors.password && (
                  <p className="mt-2 text-xs text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Server Error */}
              {mutation.isError && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-600">
                    Invalid email or password.
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="h-12 w-full rounded-xl bg-neutral-900 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {mutation.isPending
                  ? 'Signing in...'
                  : 'Sign in'}
              </button>
            </form>

            {/* Register */}
            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-400">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="font-medium text-neutral-900 transition hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>

            {/* Footer */}
            <p className="mt-12 text-center text-xs leading-5 text-neutral-400">
              By continuing, you agree to our Terms of Service
              and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}