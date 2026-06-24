"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { EtherealBlobs } from "./EtherealBlobs";

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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      <EtherealBlobs />

      {/* Decorative top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent origin-center"
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Eyebrow */}
        <FadeUp delay={0} className="text-amber-300/80 text-sm font-medium tracking-widest uppercase mb-6">
          {copy.event.subtitle}
        </FadeUp>

        {/* Main title */}
        <FadeUp delay={0.15} className="mb-8">
          <h1
            className="text-5xl sm:text-7xl font-bold leading-tight"
            style={{
              background:
                "linear-gradient(135deg, #f5ede0 0%, #d4a843 50%, #c4a882 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {copy.event.title}
          </h1>
        </FadeUp>

        {/* Date & time */}
        <FadeUp delay={0.3} className="mb-12">
          <div className="flex items-center justify-center gap-4 text-stone-300 text-lg">
            <span>{copy.event.date}</span>
            <span className="w-1 h-1 rounded-full bg-amber-400/60" aria-hidden="true" />
            <span>{copy.event.time}</span>
          </div>
        </FadeUp>

        {/* Description */}
        <FadeUp delay={0.45} className="mb-16">
          <p className="text-lg text-stone-300/90 leading-relaxed max-w-xl mx-auto">
            {copy.event.description}
          </p>
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={0.6}>
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
        <svg
          className="w-6 h-6 text-amber-400/40 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.div>
    </section>
  );
}
