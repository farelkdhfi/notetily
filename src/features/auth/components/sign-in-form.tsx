'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'

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
    <div className="min-h-screen bg-[#f7f7f5] text-[#1d1d1f]">
      <div className="mx-auto flex min-h-screen max-w-7xl">

        {/* Left - Brand / Visual */}
        <div className="relative hidden w-1/2 overflow-hidden p-4 lg:block">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] bg-[#1d1d1f] p-10 text-white">

            {/* Decorative circle - single, subtle, matches landing page orb motif */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-white/[0.035]" />

            {/* Logo */}
            <div className="relative z-10">
              <Link
                href="/"
                className="text-[18px] font-bold tracking-[-0.02em] text-white"
              >
                Notetily.
              </Link>
            </div>

            {/* Main message */}
            <div className="relative z-10 max-w-lg">
              <p className="mb-5 text-xs font-medium uppercase tracking-widest text-white/50">
                Your thoughts, simplified.
              </p>

              <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white">
                Everything you need.
                <br />
                Nothing you don&apos;t.
              </h1>

              <p className="mt-7 max-w-md text-[15px] leading-7 text-white/60">
                Capture ideas, organize your thoughts, and keep everything
                that matters in one simple place.
              </p>
            </div>

            {/* Bottom */}
            <div className="relative z-10 flex items-center justify-between text-xs text-white/40">
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
                className="text-[18px] font-bold tracking-[-0.02em] text-[#1d1d1f]"
              >
                Notetily.
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-10">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-black/40">
                Welcome back
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.045em] text-[#1d1d1f]">
                Sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-black/45">
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
                  className="mb-2 block text-sm font-medium text-[#1d1d1f]/80"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...form.register('email')}
                  className="h-12 w-full rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-[#1d1d1f] outline-none transition placeholder:text-black/25 focus:border-black/20 focus:ring-4 focus:ring-black/[0.04]"
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
                    className="text-sm font-medium text-[#1d1d1f]/80"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-black/40 transition hover:text-[#1d1d1f]"
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
                  className="h-12 w-full rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-[#1d1d1f] outline-none transition placeholder:text-black/25 focus:border-black/20 focus:ring-4 focus:ring-black/[0.04]"
                />

                {form.formState.errors.password && (
                  <p className="mt-2 text-xs text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Server Error */}
              {mutation.isError && (
                <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-600">
                    Invalid email or password.
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] text-sm font-medium text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-black active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {mutation.isPending ? 'Signing in...' : 'Sign in'}
                {!mutation.isPending && (
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                )}
              </button>
            </form>

            {/* Register */}
            <div className="mt-8 text-center">
              <p className="text-sm text-black/40">
                Don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  className="font-medium text-[#1d1d1f] transition hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>

            {/* Footer */}
            <p className="mt-12 text-center text-xs leading-5 text-black/35">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}