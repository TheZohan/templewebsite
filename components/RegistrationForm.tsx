"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { copy } from "@/lib/copy";
import { registrationSchema, type RegistrationData } from "@/lib/schema";
import { Confirmation } from "./Confirmation";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 text-sm text-red-400">
      {message}
    </p>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-stone-300 mb-1">
      {children}
      {required && <span className="text-amber-400 ms-1">*</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl px-4 py-3 bg-mystic-800/60 border border-mystic-600/50 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-colors";

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });

  const priorExperience = watch("priorExperience");

  async function onSubmit(data: RegistrationData) {
    setServerError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        return;
      }

      const body = await res.json().catch(() => ({}));
      setServerError(body.message ?? copy.errors.serverError);
    } catch {
      setServerError(copy.errors.submitFailed);
    }
  }

  if (submitted) {
    return <Confirmation />;
  }

  return (
    <section
      id="registration"
      className="relative py-24 px-6 scroll-mt-8"
      aria-labelledby="form-heading"
    >
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #3d2f6b 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2
            id="form-heading"
            className="text-3xl font-bold text-amber-200 mb-3"
          >
            {copy.form.title}
          </h2>
          <p className="text-stone-400">{copy.form.subtitle}</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-2xl p-8 space-y-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,19,48,0.85) 0%, rgba(13,10,26,0.9) 100%)",
            border: "1px solid rgba(212,168,67,0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Honeypot — visually hidden, must remain empty */}
          <div aria-hidden="true" className="hidden">
            <input tabIndex={-1} autoComplete="off" {...register("_hp")} />
          </div>

          {/* Personal info row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" required>
                {copy.form.fields.firstName.label}
              </Label>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                placeholder={copy.form.fields.firstName.placeholder}
                className={inputClass}
                {...register("firstName")}
              />
              <FieldError message={errors.firstName?.message} />
            </div>
            <div>
              <Label htmlFor="lastName" required>
                {copy.form.fields.lastName.label}
              </Label>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                placeholder={copy.form.fields.lastName.placeholder}
                className={inputClass}
                {...register("lastName")}
              />
              <FieldError message={errors.lastName?.message} />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" required>
              {copy.form.fields.email.label}
            </Label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={copy.form.fields.email.placeholder}
              className={`${inputClass} [direction:ltr] text-start`}
              {...register("email")}
            />
            <FieldError message={errors.email?.message} />
          </div>

          {/* Gender + Phone row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="gender" required>
                {copy.form.fields.gender.label}
              </Label>
              <select
                id="gender"
                className={`${inputClass} cursor-pointer`}
                defaultValue=""
                {...register("gender")}
              >
                <option value="" disabled>
                  {copy.form.fields.gender.placeholder}
                </option>
                {copy.form.fields.gender.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <FieldError message={errors.gender?.message} />
            </div>
            <div>
              <Label htmlFor="phone" required>
                {copy.form.fields.phone.label}
              </Label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder={copy.form.fields.phone.placeholder}
                className={`${inputClass} [direction:ltr] text-start`}
                {...register("phone")}
              />
              <FieldError message={errors.phone?.message} />
            </div>
          </div>

          {/* Health */}
          <div>
            <Label htmlFor="health">
              {copy.form.fields.health.label}
            </Label>
            <textarea
              id="health"
              rows={3}
              placeholder={copy.form.fields.health.placeholder}
              className={inputClass}
              {...register("health")}
            />
          </div>

          {/* Nature element */}
          <div>
            <Label htmlFor="natureElement">
              {copy.form.fields.natureElement.label}
            </Label>
            <textarea
              id="natureElement"
              rows={2}
              placeholder={copy.form.fields.natureElement.placeholder}
              className={inputClass}
              {...register("natureElement")}
            />
          </div>

          {/* Volunteer */}
          <div>
            <Label htmlFor="volunteer">
              {copy.form.fields.volunteer.label}
            </Label>
            <textarea
              id="volunteer"
              rows={2}
              placeholder={copy.form.fields.volunteer.placeholder}
              className={inputClass}
              {...register("volunteer")}
            />
          </div>

          {/* Prior experience */}
          <fieldset>
            <legend className="block text-sm font-medium text-stone-300 mb-2">
              {copy.form.fields.priorExperience.label}
            </legend>
            <div className="flex flex-col gap-2">
              {copy.form.fields.priorExperience.options.map((o) => (
                <label key={o.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    value={o.value}
                    {...register("priorExperience")}
                    className="h-4 w-4 shrink-0 accent-amber-400 cursor-pointer"
                  />
                  <span className="text-sm text-stone-300 group-hover:text-stone-100 transition-colors">
                    {o.label}
                  </span>
                </label>
              ))}
            </div>
            {priorExperience === "yes" && (
              <div className="mt-3">
                <Label htmlFor="priorExperienceWhich">
                  {copy.form.fields.priorExperience.whichLabel}
                </Label>
                <input
                  id="priorExperienceWhich"
                  type="text"
                  placeholder={copy.form.fields.priorExperience.whichPlaceholder}
                  className={inputClass}
                  {...register("priorExperienceWhich")}
                />
              </div>
            )}
          </fieldset>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">
              {copy.form.fields.notes.label}
            </Label>
            <textarea
              id="notes"
              rows={3}
              placeholder={copy.form.fields.notes.placeholder}
              className={inputClass}
              {...register("notes")}
            />
          </div>

          {/* Consent agreements */}
          <fieldset>
            <legend className="text-base font-semibold text-amber-200 mb-1">
              {copy.form.consents.title}
            </legend>
            <p className="text-sm text-stone-400 mb-4">
              {copy.form.consents.subtitle}
            </p>
            <div className="space-y-3">
              {copy.form.consents.items.map((text, i) => {
                const key = `consent${i}` as keyof RegistrationData;
                const err = (errors as Record<string, { message?: string }>)[key]?.message;
                return (
                  <label
                    key={i}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      {...register(key)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-mystic-600 bg-mystic-800 accent-amber-400 cursor-pointer"
                    />
                    <span className="text-sm text-stone-300 group-hover:text-stone-100 transition-colors leading-relaxed">
                      {text}
                    </span>
                    {err && (
                      <span role="alert" className="sr-only">
                        {err}
                      </span>
                    )}
                  </label>
                );
              })}
              {/* Show one consent error if any */}
              {(errors.consent0 ||
                errors.consent1 ||
                errors.consent2 ||
                errors.consent3 ||
                errors.consent4) && (
                <p role="alert" className="text-sm text-red-400 mt-1">
                  {copy.errors.consentRequired}
                </p>
              )}
            </div>
          </fieldset>

          {/* Server error */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                role="alert"
                className="rounded-xl px-4 py-3 bg-red-900/30 border border-red-500/30 text-red-300 text-sm"
              >
                {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl text-lg font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: isSubmitting
                ? "rgba(212,168,67,0.4)"
                : "linear-gradient(135deg, #d4a843 0%, #e8c96a 100%)",
              color: "#0d0a1a",
              boxShadow: isSubmitting
                ? "none"
                : "0 0 30px rgba(212, 168, 67, 0.3)",
            }}
          >
            {isSubmitting ? copy.form.submitting : copy.form.submit}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
