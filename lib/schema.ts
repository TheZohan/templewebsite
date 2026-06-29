import { z } from "zod";
import { copy } from "./copy";

const e = copy.errors;

export const registrationSchema = z.object({
  firstName: z.string().min(1, e.required),
  lastName: z.string().min(1, e.required),
  email: z.string().min(1, e.required).email(e.emailInvalid),
  gender: z.enum(["man", "woman", "other"], e.genderRequired),
  phone: z.string().min(1, e.required),
  health: z.string().optional(),
  natureElement: z.string().optional(),
  volunteer: z.string().optional(),
  priorExperience: z.enum(["yes", "no"]).optional(),
  priorExperienceWhich: z.string().optional(),
  notes: z.string().optional(),
  consent0: z.literal(true, e.consentRequired),
  consent1: z.literal(true, e.consentRequired),
  consent2: z.literal(true, e.consentRequired),
  consent3: z.literal(true, e.consentRequired),
  consent4: z.literal(true, e.consentRequired),
  // Honeypot: must be empty (bots fill it)
  _hp: z.string().max(0).optional(),
});

export type RegistrationData = z.infer<typeof registrationSchema>;
