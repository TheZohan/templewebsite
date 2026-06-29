"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { copy } from "@/lib/copy";

function Card({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className="relative rounded-2xl p-8 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(61,47,107,0.5) 0%, rgba(26,19,48,0.7) 100%)",
        border: "1px solid rgba(240,232,216,0.1)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Subtle chalk-rule at top of card */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(240,232,216,0.15), transparent)" }}
      />
      {children}
    </motion.div>
  );
}

export function EventDetails() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, #2a1f4a 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-center mb-4 text-amber-200"
        >
          מה קורה שם?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-stone-400 mb-16 max-w-xl mx-auto leading-relaxed"
        >
          {copy.event.descriptionExtended}
        </motion.p>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <Card delay={0}>
            <div className="text-3xl mb-3">📅</div>
            <p className="text-xs text-amber-400/70 uppercase tracking-wider mb-1">תאריך</p>
            <p className="text-xl font-semibold text-stone-100">{copy.event.date}</p>
            <p className="text-stone-400 mt-1">{copy.event.time}</p>
          </Card>

          <Card delay={0.1}>
            <div className="text-3xl mb-3">📍</div>
            <p className="text-xs text-amber-400/70 uppercase tracking-wider mb-1">מיקום</p>
            <p className="text-xl font-semibold text-stone-100">{copy.event.location}</p>
          </Card>

          <Card delay={0.2}>
            <div className="text-3xl mb-3">✨</div>
            <p className="text-xs text-amber-400/70 uppercase tracking-wider mb-1">מה מחכה לנו</p>
            <p className="text-stone-300 leading-relaxed">
              חיבורים | הנחיה משחקית | מרחב חקירה מאפשר
            </p>
          </Card>
        </div>

        {/* Pricing */}
        <Card delay={0.3}>
          <div className="text-center">
            <p className="text-xs text-amber-400/70 uppercase tracking-wider mb-4">מחיר השתתפות</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div>
                <p className="text-4xl font-bold text-amber-300">{copy.pricing.single.replace(" ליחיד", "")}</p>
                <p className="text-stone-400 mt-1">ליחיד</p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-amber-400/20" aria-hidden="true" />
              <div>
                <p className="text-4xl font-bold text-amber-300">{copy.pricing.couple.replace(" לזוג", "")}</p>
                <p className="text-stone-400 mt-1">לזוג</p>
              </div>
            </div>
            <p className="text-stone-500 text-sm mt-6">{copy.pricing.note}</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
