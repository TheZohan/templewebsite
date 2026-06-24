import { Hero } from "@/components/Hero";
import { EventDetails } from "@/components/EventDetails";
import { RegistrationForm } from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #060a14 0%, #0d1628 40%, #060a14 100%)" }}
    >
      <Hero />
      <EventDetails />
      <RegistrationForm />

      <footer className="text-center py-8 text-stone-600 text-sm border-t border-white/5">
        <p>© 2026 הטמפל · כל הזכויות שמורות</p>
      </footer>
    </main>
  );
}
