"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";

export function Confirmation() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,19,48,0.9) 0%, rgba(13,10,26,0.95) 100%)",
            border: "1px solid rgba(212,168,67,0.25)",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-6xl mb-6"
          >
            ✨
          </motion.div>
          <h2 className="text-3xl font-bold text-amber-200 mb-4">
            {copy.confirmation.title}
          </h2>
          <p className="text-stone-300 leading-relaxed mb-8">
            {copy.confirmation.body}
          </p>

          <div
            className="rounded-xl p-6 text-start"
            style={{ background: "rgba(61,47,107,0.4)" }}
          >
            <h3 className="font-semibold text-amber-300 mb-2">
              {copy.confirmation.paymentTitle}
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              {copy.confirmation.paymentBody}
            </p>
            <div className="flex gap-6">
              <p className="text-stone-300 text-sm">{copy.confirmation.priceSingle}</p>
              <p className="text-stone-300 text-sm">{copy.confirmation.priceCouple}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
