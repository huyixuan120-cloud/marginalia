import Link from "next/link";
import { getAllEssays } from "@/lib/essays";

export function Hero() {
  const heroEssay = getAllEssays()[0];

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroEssay.image}
          alt={heroEssay.title}
          className="h-full w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content Container */}
      <Link href={`/essay/${heroEssay.slug}`}>
        <div className="relative z-10 flex h-full items-end justify-end pb-20 pr-6 md:pr-20 cursor-pointer group">
          <div className="max-w-3xl text-right text-stone-50">
            <span className="mb-4 inline-block font-sans text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase">
              {heroEssay.category}
            </span>
            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-7xl transition-opacity group-hover:opacity-80">
              {heroEssay.title}
            </h1>
            <p className="ml-auto max-w-xl font-sans text-lg font-light leading-relaxed text-stone-200">
              {heroEssay.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}
