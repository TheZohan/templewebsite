import { Hero } from "@/components/Hero";
import { EventDetails } from "@/components/EventDetails";
import { RegistrationForm } from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #0d0a1a 0%, #1a1330 50%, #0d0a1a 100%)" }}
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
