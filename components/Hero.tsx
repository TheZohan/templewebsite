"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { copy } from "@/lib/copy";
import { EtherealBlobs } from "./EtherealBlobs";
import { Sparkles } from "./Sparkles";

function FadeUp({
  delay = 0,
  children,
  className,
}: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="chalk-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      <EtherealBlobs />
      <Sparkles />

      {/* Chalkboard-style top rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 inset-x-0 h-[2px] origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(240,232,216,0.3) 30%, rgba(212,168,67,0.5) 50%, rgba(240,232,216,0.3) 70%, transparent)",
        }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Org name */}
        <FadeUp delay={0} className="mb-6">
          <span
            className="text-sm tracking-widest"
            style={{ color: "#d4a843", letterSpacing: "0.2em" }}
          >
            {copy.org}
          </span>
        </FadeUp>

        {/* Team photo */}
        <FadeUp delay={0.1} className="mb-8 flex justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(212,168,67,0.2), 0 0 0 1px rgba(212,168,67,0.15)" }}
          >
            <Image
              src="/team.png"
              alt="צוות הטמפל"
              fill
              className="object-cover"
              priority
            />
          </div>
        </FadeUp>

        {/* Main title */}
        <FadeUp delay={0.2} className="mb-4">
          <h1
            className="text-5xl sm:text-7xl font-bold leading-tight text-amber-200"
            style={{ textShadow: "0 0 30px rgba(212,168,67,0.7), 0 0 60px rgba(212,168,67,0.3)" }}
          >
            {copy.event.title}
          </h1>
        </FadeUp>

        {/* Date & time */}
        <FadeUp delay={0.3} className="mb-10">
          <div className="flex items-center justify-center gap-4 text-stone-300/80 text-base">
            <span>{copy.event.date}</span>
            <span className="w-1 h-1 rounded-full bg-amber-400/50" aria-hidden="true" />
            <span>{copy.event.time}</span>
          </div>
        </FadeUp>

        {/* Teasers */}
        <FadeUp delay={0.4} className="mb-8">
          <ul className="space-y-2 text-base text-stone-300/85">
            {copy.event.teasers.map((teaser) => (
              <li key={teaser} className="flex items-center justify-center gap-2">
                <span style={{ color: "#d4a843" }}>✦</span>
                {teaser}
              </li>
            ))}
          </ul>
        </FadeUp>

        {/* Theme pills */}
        <FadeUp delay={0.5} className="mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {copy.event.pills.map((pill) => (
              <span
                key={pill}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(240,232,216,0.15)",
                  color: "#d9c4a0",
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={0.65}>
          <motion.a
            href="#registration"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-10 py-4 rounded-full text-lg font-semibold cursor-pointer select-none"
            style={{
              background: "linear-gradient(135deg, #d4a843 0%, #e8c96a 100%)",
              color: "#0d0a1a",
              boxShadow: "0 0 40px rgba(212, 168, 67, 0.35)",
            }}
          >
            {copy.cta}
          </motion.a>
        </FadeUp>
      </div>

      {/* Scroll chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <svg className="w-6 h-6 text-amber-400/40 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
