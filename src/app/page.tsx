import {
  ArrowRight,
  Check,
  Cloud,
  Command,
  Lock,
  Menu,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImg from "@/assets/hero.png"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#1d1d1f]">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-black/[0.06] bg-white/75 px-5 py-3 shadow-sm backdrop-blur-xl">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-[18px] font-bold tracking-[-0.02em]">
              Notetily.
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-black/55 transition hover:text-black"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-sm text-black/55 transition hover:text-black"
            >
              About
            </a>

            <a
              href="#pricing"
              className="text-sm text-black/55 transition hover:text-black"
            >
              Pricing
            </a>
          </nav>

          {/* Right */}
          <div className="hidden items-center gap-3 sm:flex">
            <Link href='/signin' className="px-3 text-sm font-medium text-black/60 transition hover:text-black">
              Sign in
            </Link>

            <button className="rounded-full bg-[#1d1d1f] px-4 py-2 text-sm font-medium text-white transition hover:bg-black">
              Get started
            </button>
          </div>

          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] sm:hidden">
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24">

        {/* Background Image */}
        <div className="pointer-events-none absolute inset-0  opacity-30">
          <Image
            src={heroImg}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-white blur-3xl" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-5xl text-center">

          {/* Badge */}
          {/* <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3.5 py-1.5 shadow-sm">
            <span className="text-xs font-medium text-black/60">
              A better way to organize your thoughts
            </span>
          </div> */}

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl mt-16 text-[48px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[72px] md:text-[88px]">
            Your thoughts,
            <br />
            <span className="text-black/35">
              beautifully organized.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-black/50 sm:text-lg">
            A simple, elegant space for your notes, ideas, and everything worth
            remembering. Designed to stay out of your way.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="group flex h-12 items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-6 text-sm font-medium text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-black">
              Start writing
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>

            <button className="h-12 rounded-full border border-black/[0.08] bg-white px-6 text-sm font-medium shadow-sm transition hover:bg-black/[0.03]">
              Explore features
            </button>
          </div>
        </div>

        {/* App Preview */}
        <div className="mx-auto mt-20 z-10 relative max-w-5xl">
          <div className="overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.10)]">
            {/* Window Header */}
            <div className="flex h-12 items-center border-b border-black/[0.06] px-5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 text-xs font-medium text-black/35">
                Notetily.
              </div>
            </div>

            {/* App */}
            <div className="grid min-h-[520px] grid-cols-1 md:grid-cols-[220px_1fr]">
              {/* Sidebar */}
              <aside className="hidden border-r border-black/[0.06] bg-[#fafafa] p-4 md:block">
                <button className="mb-5 flex w-full items-center gap-2 rounded-xl bg-black/[0.05] px-3 py-2 text-left text-sm font-medium">
                  <span className="text-lg">＋</span>
                  New note
                </button>

                <div className="space-y-1">
                  <SidebarItem title="All Notes" active />
                  <SidebarItem title="Favorites" />
                  <SidebarItem title="Archive" />
                </div>

                <div className="mt-8 px-3">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-black/30">
                    Folders
                  </p>

                  <div className="space-y-3 text-sm text-black/50">
                    <p>Personal</p>
                    <p>Work</p>
                    <p>Ideas</p>
                  </div>
                </div>
              </aside>

              {/* Notes List */}
              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
                <div className="border-r border-black/[0.06] p-5">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight">
                      Notes
                    </h2>

                    <span className="text-xs text-black/30">12 notes</span>
                  </div>

                  <div className="space-y-2">
                    <NoteItem
                      title="Ideas for the weekend"
                      description="A few things I want to..."
                      time="9:42 AM"
                      active
                    />

                    <NoteItem
                      title="Project ideas"
                      description="Build something simple..."
                      time="Yesterday"
                    />

                    <NoteItem
                      title="Books to read"
                      description="The creative act..."
                      time="Aug 6"
                    />

                    <NoteItem
                      title="Things to remember"
                      description="Keep things simple..."
                      time="Aug 4"
                    />
                  </div>
                </div>

                {/* Editor */}
                <div className="p-7 sm:p-10">
                  <div className="mx-auto max-w-2xl">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="text-xs text-black/30">
                        Updated just now
                      </span>

                      <button className="rounded-full px-3 py-1.5 text-xs text-black/40 hover:bg-black/[0.04]">
                        •••
                      </button>
                    </div>

                    <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                      Ideas for the weekend
                    </h2>

                    <p className="mt-7 text-[15px] leading-8 text-black/55">
                      Sometimes the best weekends are the ones without a
                      complicated plan.
                    </p>

                    <p className="mt-5 text-[15px] leading-8 text-black/55">
                      Go somewhere new. Read a book. Take a long walk. Put the
                      phone away for a while and let the mind wander.
                    </p>

                    <div className="my-8 h-px bg-black/[0.06]" />

                    <p className="text-[15px] leading-8 text-black/55">
                      <span className="font-medium text-black">
                        Things worth doing:
                      </span>
                    </p>

                    <div className="mt-4 space-y-3">
                      {[
                        "Visit a new coffee shop",
                        "Finish the book I'm reading",
                        "Take some photos",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 text-sm text-black/55"
                        >
                          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-black/15">
                            <Check size={11} />
                          </div>

                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Social Proof */}
      <section className="border-y border-black/[0.05] bg-white px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-xs font-medium uppercase tracking-widest text-black/30">
            Loved by people who value simplicity
          </p>

          <div className="flex items-center gap-6 text-sm text-black/30">
            <span>10,000+ notes</span>
            <span className="h-1 w-1 rounded-full bg-black/20" />
            <span>4.9/5 rating</span>
            <span className="h-1 w-1 rounded-full bg-black/20" />
            <span>Made with care</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium text-black/40">
              Everything you need
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Simple by design.
              <br />
              Powerful when needed.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-black/45">
              No complicated menus. No distractions. Just a beautiful place
              to capture your thoughts and keep them organized.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={<Zap size={19} />}
              title="Instant"
              description="Open the app and start writing immediately. Everything feels fast and effortless."
            />

            <FeatureCard
              icon={<Cloud size={19} />}
              title="Always synced"
              description="Your notes stay up to date across all your devices, automatically."
            />

            <FeatureCard
              icon={<Lock size={19} />}
              title="Private"
              description="Your thoughts belong to you. Keep your personal notes safe and private."
            />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section id="about" className="bg-[#1d1d1f] px-6 py-28 text-white sm:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={15}
                fill="currentColor"
                className="text-white"
              />
            ))}
          </div>

          <blockquote className="text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-5xl">
            “Notetily. feels like the notes app I always wished I had.”
          </blockquote>

          <p className="mt-7 text-sm text-white/40">— Alex Morgan</p>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-black/[0.06] bg-white px-6 py-16 text-center shadow-sm sm:px-10">
          <p className="text-sm font-medium text-black/40">
            Start for free
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Make space for your ideas.
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-black/45">
            Create your first note today. No credit card required.
          </p>

          <button className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#1d1d1f] px-6 text-sm font-medium text-white transition hover:bg-black">
            Get started
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.06] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Notetily.</span>
          </div>

          <p className="text-xs text-black/35">
            © 2026 Notetily. Made for your thoughts.
          </p>

          <div className="flex gap-5 text-xs text-black/40">
            <a href="#" className="hover:text-black">
              Privacy
            </a>

            <a href="#" className="hover:text-black">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ---------------- Components ---------------- */

function SidebarItem({
  title,
  active = false,
}: {
  title: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-lg px-3 py-2 text-sm ${active
        ? "bg-black/[0.06] font-medium text-black"
        : "text-black/45 hover:bg-black/[0.03]"
        }`}
    >
      {title}
    </div>
  );
}

function NoteItem({
  title,
  description,
  time,
  active = false,
}: {
  title: string;
  description: string;
  time: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-3 ${active ? "bg-black/[0.055]" : "hover:bg-black/[0.03]"
        }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="truncate text-sm font-medium">{title}</p>

        <span className="shrink-0 text-[9px] text-black/25">{time}</span>
      </div>

      <p className="mt-1 truncate text-xs text-black/35">{description}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-[24px] border border-black/[0.06] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.05] transition group-hover:bg-black group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-7 text-lg font-semibold tracking-tight">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-black/45">{description}</p>
    </div>
  );
}