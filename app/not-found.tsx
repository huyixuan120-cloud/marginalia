import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FBF9F4] px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          {/* Status Code */}
          <p className="mb-8 font-sans text-xs font-bold uppercase tracking-[0.3em] text-stone-400">
            404 — Pagina non trovata
          </p>

          {/* Main Heading */}
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-stone-900 lg:text-7xl">
            Smarriti tra le righe.
          </h1>

          {/* Description */}
          <p className="mb-12 font-sans text-lg leading-relaxed text-stone-600">
            L'articolo o la sezione che cerchi non è disponibile. Forse è stata spostata o il link non è corretto.
          </p>

          {/* Call to Action */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 border-b-2 border-stone-900 pb-1 font-sans text-base font-medium text-stone-900 transition-all hover:border-stone-600 hover:text-stone-600"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Torna alla Home</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
