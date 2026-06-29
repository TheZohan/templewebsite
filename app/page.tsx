import { Hero } from "@/components/Hero";
import { EventDetails } from "@/components/EventDetails";
import { RegistrationForm } from "@/components/RegistrationForm";
import { WhatsAppButton, WhatsAppFooterLink } from "@/components/WhatsAppButton";
import { copy } from "@/lib/copy";

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #060a14 0%, #0d1628 40%, #060a14 100%)" }}
    >
      <Hero />
      <EventDetails />
      <RegistrationForm />

      <WhatsAppButton />

      <footer className="text-center py-8 text-stone-600 text-sm border-t border-white/5 space-y-3">
        <WhatsAppFooterLink />
        <p>
          <span className="text-stone-500">{copy.team.label}:</span>{" "}
          {copy.team.members.join(" · ")}
        </p>
        <p>© 2026 {copy.org} · כל הזכויות שמורות</p>
      </footer>
    </main>
  );
}
