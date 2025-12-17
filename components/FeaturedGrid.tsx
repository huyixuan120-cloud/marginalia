import Link from "next/link";
import { getAllEssays } from "@/lib/essays";

export function FeaturedGrid() {
  const essays = getAllEssays().slice(1);
  return (
    <section className="container mx-auto px-6 py-24">
      {/* Section Header */}
      <div className="mb-12 border-b border-stone-200 pb-4">
        <h2 className="font-serif text-3xl italic text-stone-900">Latest Essays</h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12">
        {essays.map((essay, index) => {
          // Determine column span based on position
          const isLead = index === 0;
          const isSidebar = index === 1;
          const colSpan = isLead ? "md:col-span-8" : isSidebar ? "md:col-span-4" : "md:col-span-4";

          return (
            <Link key={essay.slug} href={`/essay/${essay.slug}`} className={`group cursor-pointer ${colSpan}`}>
              <article>
                {/* Image */}
                <div className="mb-4 overflow-hidden">
                  <img
                    src={essay.image}
                    alt={essay.title}
                    className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <span className="font-sans text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
                    {essay.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold leading-tight text-stone-900 transition-colors group-hover:text-stone-600">
                    {essay.title}
                  </h3>
                  <p className="font-sans text-stone-600 leading-relaxed">
                    {essay.excerpt}
                  </p>
                  <p className="font-sans text-xs italic text-stone-400">
                    by {essay.author}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
