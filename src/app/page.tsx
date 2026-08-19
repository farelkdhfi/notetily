import {
  ArrowRight,
  Check,
  Cloud,
  Lock,
  Menu,
  Star,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImg from "@/assets/hero2.png";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f5f2] text-[#171717]">
      {/* ========================= NAVBAR ========================= */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-black/[0.07] bg-[#f8f8f5]/80 px-4 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.05)] backdrop-blur-2xl sm:px-5">
          <Link
            href="/"
            className="flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717]">
              <div className="h-2.5 w-2.5 rounded-full bg-white" />
            </div>

            <span className="text-[15px] font-semibold tracking-[-0.025em]">
              Notetily.
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {["Features", "About", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[12px] font-medium tracking-[-0.01em] text-black/45 transition hover:text-black"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/signin"
              className="rounded-full px-4 py-2 text-[12px] font-medium text-black/55 transition hover:text-black"
            >
              Sign in
            </Link>

            <Link
              href="/preview"
              className="group flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-[12px] font-medium text-white shadow-[0_6px_20px_rgba(0,0,0,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-black"
            >
              Get started
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.045] sm:hidden">
            <Menu size={17} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* ========================= HERO ========================= */}
      <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        {/* Hero Background Image */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={heroImg}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />

          {/* Soft overlay supaya text tetap readable */}
          <div className="absolute inset-0 bg-[#f5f5f2]/55" />

          {/* Subtle white ambient glow */}
          <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/40 blur-[120px]" />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f5f5f2] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/65 px-3.5 py-2 shadow-sm backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-black" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">
                A quieter way to think
              </span>
            </div>

            <h1 className="mx-auto text-[52px] font-semibold leading-[0.94] tracking-[-0.065em] sm:text-[76px] md:text-[94px] lg:text-[104px]">
              Your thoughts,
              <br />
              <span className="text-black/[0.22]">
                beautifully organized.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-xl text-[15px] leading-7 tracking-[-0.01em] text-black/45 sm:text-[16px]">
              A calm, beautifully designed space for notes, ideas, plans,
              and everything worth remembering.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/preview"
                className="group flex h-12 items-center gap-2 rounded-full bg-[#171717] px-6 text-[12px] font-medium text-white shadow-[0_14px_35px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-1 hover:bg-black"
              >
                Start writing

                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <a
                href="#features"
                className="flex h-12 items-center rounded-full border border-black/[0.08] bg-white/70 px-6 text-[12px] font-medium text-black/65 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Explore features
              </a>
            </div>
          </div>

          {/* ================= APP PREVIEW ================= */}
          <div className="relative mx-auto mt-20 max-w-5xl sm:mt-24">
            {/* Glow */}
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-white/60 blur-3xl" />

            <div className="overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_45px_120px_rgba(0,0,0,0.13)]">
              {/* Browser bar */}
              <div className="flex h-11 items-center border-b border-black/[0.06] bg-[#fafaf8] px-4">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-black/10" />
                  <span className="h-2 w-2 rounded-full bg-black/10" />
                  <span className="h-2 w-2 rounded-full bg-black/10" />
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-wide text-black/25">
                  notetily.app
                </div>
              </div>

              <div className="grid min-h-[540px] grid-cols-1 md:grid-cols-[210px_1fr]">
                {/* Sidebar */}
                <aside className="hidden border-r border-black/[0.055] bg-[#f9f9f7] p-4 md:block">
                  <button className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#171717] px-3 py-2.5 text-[11px] font-medium text-white shadow-sm">
                    <span className="text-sm">+</span>
                    New note
                  </button>

                  <div className="space-y-1">
                    <SidebarItem title="All Notes" active />
                    <SidebarItem title="Favorites" />
                    <SidebarItem title="Archive" />
                  </div>

                  <div className="mt-10 px-3">
                    <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/25">
                      Folders
                    </p>

                    <div className="space-y-3 text-[11px] text-black/40">
                      <p>Personal</p>
                      <p>Work</p>
                      <p>Ideas</p>
                    </div>
                  </div>
                </aside>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-[245px_1fr]">
                  <div className="border-r border-black/[0.055] p-5">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-[16px] font-semibold tracking-[-0.025em]">
                        Notes
                      </h2>

                      <span className="text-[9px] uppercase tracking-wider text-black/25">
                        12 notes
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <NoteItem
                        title="Ideas for the weekend"
                        description="A few things I want to..."
                        time="9:42"
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
                    <div className="mx-auto max-w-xl">
                      <div className="mb-10 flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-[0.16em] text-black/25">
                          Updated just now
                        </span>

                        <button className="flex h-7 w-7 items-center justify-center rounded-full text-xs text-black/30 transition hover:bg-black/[0.04]">
                          •••
                        </button>
                      </div>

                      <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                        Ideas for the weekend
                      </h2>

                      <div className="mt-8 space-y-5">
                        <p className="text-[14px] leading-7 text-black/50">
                          Sometimes the best weekends are the ones without a
                          complicated plan.
                        </p>

                        <p className="text-[14px] leading-7 text-black/50">
                          Go somewhere new. Read a book. Take a long walk. Put
                          the phone away for a while and let the mind wander.
                        </p>
                      </div>

                      <div className="my-8 h-px bg-black/[0.055]" />

                      <p className="text-[13px] font-medium text-black/70">
                        Things worth doing
                      </p>

                      <div className="mt-5 space-y-3.5">
                        {[
                          "Visit a new coffee shop",
                          "Finish the book I'm reading",
                          "Take some photos",
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 text-[12px] text-black/45"
                          >
                            <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-black/12">
                              <Check size={9} />
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
        </div>
      </section>

      {/* ========================= SOCIAL PROOF ========================= */}
      <section className="border-y border-black/[0.055] bg-[#f8f8f5] px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/25">
            Made for people who value simplicity
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] font-medium uppercase tracking-wider text-black/30 sm:gap-6">
            <span>10,000+ notes</span>
            <span className="h-1 w-1 rounded-full bg-black/15" />
            <span>4.9 / 5 rating</span>
            <span className="h-1 w-1 rounded-full bg-black/15" />
            <span>Made with care</span>
          </div>
        </div>
      </section>

      {/* ========================= FEATURES ========================= */}
      <section
        id="features"
        className="relative px-6 py-28 sm:py-36"
      >
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30">
              Everything you need
            </p>

            <h2 className="text-[42px] font-semibold leading-[1] tracking-[-0.055em] sm:text-[58px]">
              Simple by design.
              <br />
              <span className="text-black/25">
                Powerful when needed.
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-[14px] leading-7 text-black/40">
              No complicated menus. No distractions. Just a refined space
              designed to help your thoughts stay clear and organized.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={<Zap size={17} strokeWidth={1.8} />}
              title="Instant"
              description="Open the app and start writing immediately. Everything feels fast, quiet, and effortless."
            />

            <FeatureCard
              icon={<Cloud size={17} strokeWidth={1.8} />}
              title="Always synced"
              description="Your notes stay beautifully synchronized across every device, automatically."
            />

            <FeatureCard
              icon={<Lock size={17} strokeWidth={1.8} />}
              title="Private"
              description="Your thoughts belong to you. Keep your personal notes safe, private, and completely yours."
            />
          </div>
        </div>
      </section>

      {/* ========================= QUOTE ========================= */}
      <section
        id="about"
        className="relative overflow-hidden bg-[#171717] px-6 py-28 text-white sm:py-40"
      >
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-white/[0.02] blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={13}
                fill="currentColor"
                strokeWidth={0}
                className="text-white/80"
              />
            ))}
          </div>

          <blockquote className="text-[34px] font-medium leading-[1.08] tracking-[-0.045em] sm:text-[52px]">
            “Notetily. feels like the notes app I always wished I had.”
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-7 w-7 rounded-full bg-white/10" />

            <p className="text-[11px] font-medium text-white/35">
              Alex Morgan
            </p>
          </div>
        </div>
      </section>

      {/* ========================= CTA ========================= */}
      <section
        id="pricing"
        className="relative px-6 py-28 sm:py-36"
      >
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-black/[0.07] bg-white px-6 py-20 text-center shadow-[0_30px_90px_rgba(0,0,0,0.07)] sm:px-10">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-white">
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
          </div>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30">
            Start for free
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl text-[40px] font-semibold leading-[1] tracking-[-0.055em] sm:text-[56px]">
            Make space for
            <br />
            <span className="text-black/25">your ideas.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-md text-[13px] leading-6 text-black/40">
            Create your first note today. A calmer way to capture the things
            that matter.
          </p>

          <Link
            href="/preview"
            className="group mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-[#171717] px-6 text-[12px] font-medium text-white shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition duration-300 hover:-translate-y-0.5 hover:bg-black"
          >
            Get started
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer className="border-t border-black/[0.055] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#171717]">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>

            <span className="text-[12px] font-semibold tracking-[-0.02em]">
              Notetily.
            </span>
          </Link>

          <p className="text-[10px] text-black/30">
            © 2026 Notetily. Made for your thoughts.
          </p>

          <div className="flex gap-5 text-[10px] text-black/35">
            <a href="#" className="transition hover:text-black">
              Privacy
            </a>

            <a href="#" className="transition hover:text-black">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ========================= COMPONENTS ========================= */

function SidebarItem({
  title,
  active = false,
}: {
  title: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-xl px-3 py-2.5 text-[11px] transition ${active
        ? "bg-black/[0.055] font-medium text-black"
        : "text-black/40 hover:bg-black/[0.025] hover:text-black/70"
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
      className={`rounded-xl p-3 transition ${active
        ? "bg-black/[0.055]"
        : "hover:bg-black/[0.025]"
        }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="truncate text-[11px] font-medium tracking-[-0.01em]">
          {title}
        </p>

        <span className="shrink-0 text-[8px] text-black/20">
          {time}
        </span>
      </div>

      <p className="mt-1 truncate text-[9px] text-black/30">
        {description}
      </p>
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
    <div className="group relative overflow-hidden rounded-[26px] border border-black/[0.06] bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.025)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(0,0,0,0.07)]">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-black/[0.025] blur-3xl transition duration-500 group-hover:bg-black/[0.05]" />

      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.06] bg-[#f7f7f5] text-black/70 transition duration-500 group-hover:bg-[#171717] group-hover:text-white">
          {icon}
        </div>

        <h3 className="mt-8 text-[17px] font-semibold tracking-[-0.03em]">
          {title}
        </h3>

        <p className="mt-3 text-[12px] leading-6 text-black/40">
          {description}
        </p>
      </div>
    </div>
  );
}