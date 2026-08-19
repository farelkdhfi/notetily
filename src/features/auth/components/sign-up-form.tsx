"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";

import {
  signUpSchema,
  SignUpFormValues,
} from "@/lib/schemas/auth";

import { signUp } from "@/lib/api/auth";
import { createClient } from "@/lib/supabase/client";

export function SignUpForm() {
  const supabase = createClient();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: signUp,

    onSuccess: () => {
      form.reset();
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    mutation.mutate(values);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google sign in error:", error);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f5f2] text-[#171717]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] p-3 sm:p-4 lg:p-5">

        {/* =========================================================
            LEFT — BRAND EXPERIENCE
        ========================================================= */}
        <section className="relative hidden w-[52%] overflow-hidden rounded-[32px] bg-[#171717] text-white lg:flex">

          {/* Ambient glow */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-white/[0.035] blur-[2px]" />

          <div className="pointer-events-none absolute -bottom-48 -left-40 h-[500px] w-[500px] rounded-full bg-white/[0.025] blur-[100px]" />

          {/* Fine grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative z-10 flex w-full flex-col justify-between p-8 sm:p-10 xl:p-12">

            {/* Logo */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="group flex items-center gap-2.5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#171717] transition-transform duration-300 group-hover:rotate-12">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#171717]" />
                </span>

                <span className="text-[15px] font-semibold tracking-[-0.025em]">
                  Notetily.
                </span>
              </Link>

              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/25">
                Your private workspace
              </span>
            </div>

            {/* Main message */}
            <div className="max-w-xl">

              <div className="mb-7 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  Start capturing today
                </span>
              </div>

              <h1 className="text-[52px] font-semibold leading-[0.94] tracking-[-0.065em] text-white xl:text-[68px]">
                Give your ideas
                <br />
                <span className="text-white/[0.28]">
                  a place to live.
                </span>
              </h1>

              <p className="mt-8 max-w-md text-[14px] leading-7 text-white/45">
                Create a calm space for your thoughts, ideas, plans, and
                everything you don't want to forget.
              </p>

              {/* Benefits */}
              <div className="mt-10 grid max-w-sm grid-cols-3 gap-2">
                {[
                  {
                    title: "Fast",
                    description: "Write instantly",
                  },
                  {
                    title: "Private",
                    description: "Yours alone",
                  },
                  {
                    title: "Synced",
                    description: "Everywhere",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[16px] border border-white/[0.07] bg-white/[0.035] p-3.5 backdrop-blur-xl"
                  >
                    <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.07]">
                      <Check
                        size={11}
                        strokeWidth={1.8}
                        className="text-white/65"
                      />
                    </div>

                    <p className="text-[10px] font-medium text-white/65">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[8px] text-white/25">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-end justify-between border-t border-white/[0.07] pt-5">
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                © 2026 Notetily.
              </p>

              <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                Simple. Focused. Yours.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            RIGHT — SIGN UP
        ========================================================= */}
        <section className="relative flex w-full items-center justify-center px-5 py-10 sm:px-10 lg:w-[48%] lg:px-14 xl:px-20">

          {/* Ambient background */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[120px]" />

          <div className="relative w-full max-w-[410px]">

            {/* Mobile logo */}
            <div className="mb-16 lg:hidden">
              <Link
                href="/"
                className="flex items-center gap-2.5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717]">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                </span>

                <span className="text-[15px] font-semibold tracking-[-0.025em]">
                  Notetily.
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-10">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#171717]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-black/30">
                  Create your space
                </span>
              </div>

              <h2 className="text-[44px] font-semibold leading-[0.95] tracking-[-0.06em] sm:text-[48px]">
                Create
                <br />
                your account.
              </h2>

              <p className="mt-5 max-w-sm text-[13px] leading-6 text-black/40">
                It only takes a minute. Your workspace will be ready when you
                are.
              </p>
            </div>

            {/* =====================================================
                SUCCESS STATE
            ===================================================== */}
            {mutation.isSuccess ? (
              <div className="relative overflow-hidden rounded-[24px] border border-black/[0.07] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                {/* Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-black/[0.025] blur-3xl" />

                <div className="relative">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                    <Check size={18} strokeWidth={1.8} />
                  </div>

                  <p className="mt-7 text-[18px] font-semibold tracking-[-0.03em]">
                    Check your email.
                  </p>

                  <p className="mt-3 text-[12px] leading-6 text-black/40">
                    We sent a confirmation link to your inbox. Follow the link
                    to activate your account and start using Notetily.
                  </p>

                  <div className="mt-7 border-t border-black/[0.06] pt-5">
                    <p className="text-[9px] uppercase tracking-[0.16em] text-black/25">
                      Didn&apos;t receive it?
                    </p>

                    <button
                      type="button"
                      onClick={() => mutation.reset()}
                      className="mt-2 text-[11px] font-semibold text-black/60 transition hover:text-black"
                    >
                      Try another email
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* =================================================
                    FORM
                ================================================= */}
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      {...form.register("email")}
                      className="h-[54px] w-full rounded-[16px] border border-black/[0.075] bg-white/75 px-4 text-[13px] text-[#171717] shadow-[0_6px_25px_rgba(0,0,0,0.025)] outline-none backdrop-blur-xl transition duration-300 placeholder:text-black/20 hover:border-black/[0.12] focus:border-black/[0.22] focus:bg-white focus:ring-4 focus:ring-black/[0.025]"
                    />

                    {form.formState.errors.email && (
                      <p className="mt-2 text-[11px] text-red-500/80">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Create a password"
                      {...form.register("password")}
                      className="h-[54px] w-full rounded-[16px] border border-black/[0.075] bg-white/75 px-4 text-[13px] text-[#171717] shadow-[0_6px_25px_rgba(0,0,0,0.025)] outline-none backdrop-blur-xl transition duration-300 placeholder:text-black/20 hover:border-black/[0.12] focus:border-black/[0.22] focus:bg-white focus:ring-4 focus:ring-black/[0.025]"
                    />

                    {form.formState.errors.password && (
                      <p className="mt-2 text-[11px] text-red-500/80">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Error */}
                  {mutation.isError && (
                    <div className="rounded-[16px] border border-red-500/[0.1] bg-red-500/[0.035] px-4 py-3">
                      <p className="text-[11px] leading-5 text-red-600/80">
                        {mutation.error.message}
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#171717] text-[12px] font-medium text-white shadow-[0_14px_35px_rgba(0,0,0,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-black active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {mutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/30 border-t-white" />
                        Creating account...
                      </span>
                    ) : (
                      <>
                        Create account
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-black/[0.06]" />
                    </div>

                    <div className="relative flex justify-center">
                      <span className="bg-[#f5f5f2] px-4 text-[9px] font-medium uppercase tracking-[0.15em] text-black/25">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Google */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-full border border-black/[0.075] bg-white/70 text-[12px] font-medium text-[#171717] shadow-[0_6px_25px_rgba(0,0,0,0.025)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-black/[0.13] hover:bg-white active:translate-y-0"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f5f2] transition group-hover:bg-white">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.805 10.023H12V14.023H17.657C16.825 16.657 14.657 18.023 12 18.023C8.686 18.023 6 15.337 6 12.023C6 8.709 8.686 6.023 12 6.023C13.53 6.023 14.923 6.596 15.985 7.533L18.828 4.69C17.02 3.023 14.634 2.023 12 2.023C6.477 2.023 2 6.5 2 12.023C2 17.546 6.477 22.023 12 22.023C17.523 22.023 22 17.546 22 12.023C22 11.356 21.932 10.705 21.805 10.023Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>

                    Continue with Google
                  </button>
                </form>

                {/* Sign in */}
                <div className="mt-9 text-center">
                  <p className="text-[11px] text-black/35">
                    Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="font-semibold text-[#171717] transition hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            )}

            {/* Security */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <LockKeyhole
                size={11}
                strokeWidth={1.7}
                className="text-black/25"
              />

              <p className="text-[9px] uppercase tracking-[0.12em] text-black/25">
                Your data stays private
              </p>
            </div>

            {/* Legal */}
            <p className="mx-auto mt-4 max-w-xs text-center text-[9px] leading-5 text-black/25">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}