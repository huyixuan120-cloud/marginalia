import Link from "next/link";
import type { Essay } from "@/lib/essays";

interface HeroProps {
  essay: Essay;
}

export function Hero({ essay: heroEssay }: HeroProps) {

  return (
    <section className="relative h-[60vh] w-full overflow-hidden lg:h-[75vh]">
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
        <div className="relative z-10 flex h-full items-end justify-end pb-12 pr-6 lg:pb-20 lg:pr-20 cursor-pointer group">
          <div className="max-w-3xl text-right text-stone-50">
            <span className="mb-3 inline-block font-sans text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase lg:mb-4">
              {heroEssay.category}
            </span>
            <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-balance lg:mb-6 lg:text-7xl transition-opacity group-hover:opacity-80">
              {heroEssay.title}
            </h1>
            <p className="ml-auto max-w-xl font-sans text-base font-light leading-relaxed text-stone-200 lg:text-lg">
              {heroEssay.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}
