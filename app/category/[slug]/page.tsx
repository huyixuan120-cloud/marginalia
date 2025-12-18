import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEssays } from "@/lib/essays";

// Mappatura categorie (slug -> nome visualizzato)
const CATEGORIES: Record<string, string> = {
  economia: "Economia",
  storia: "Storia",
  societa: "Società",
  geopolitica: "Geopolitica",
  filosofia: "Filosofia",
  tecnologia: "Tecnologia",
};

// Genera i percorsi statici
export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({
    slug,
  }));
}

// IMPORTANTE: params è ora una Promise in Next.js 15+
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = CATEGORIES[slug];

  // Se lo slug non esiste, mostra 404
  if (!categoryName) {
    notFound();
  }

  // Ottieni tutti gli articoli reali e filtra per categoria
  const allEssays = getAllEssays();
  const categoryEssays = allEssays.filter((essay) => essay.category.toLowerCase() === slug);

  return (
    <main className="min-h-screen bg-[#FBF9F4]">
      {/* Intestazione Categoria */}
      <section className="border-b border-stone-200 bg-white">
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-4xl">
            <h1 className="mb-4 font-serif text-5xl font-bold leading-tight text-stone-900 lg:text-7xl">
              {categoryName}
            </h1>
            <p className="font-sans text-lg leading-relaxed text-stone-600 lg:text-xl">
              Curated essays and reflections on {categoryName}
            </p>
          </div>
        </div>
      </section>

      {/* Griglia Articoli */}
      <section className="container mx-auto px-6 py-16 lg:py-24">
        {categoryEssays.length > 0 ? (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {categoryEssays.map((essay) => (
              <Link key={essay.slug} href={`/essay/${essay.slug}`}>
                <article className="group cursor-pointer">
                  {/* Immagine */}
                  <div className="mb-6 overflow-hidden rounded-sm bg-stone-200">
                    <img
                      src={essay.image}
                      alt={essay.title}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Contenuto */}
                  <div className="space-y-3">
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                      {categoryName}
                    </span>
                    <h3 className="font-serif text-2xl font-bold leading-tight text-stone-900 transition-colors group-hover:text-stone-600">
                      {essay.title}
                    </h3>
                    <p className="font-sans leading-relaxed text-stone-600">
                      {essay.excerpt}
                    </p>
                    <p className="font-sans text-xs italic text-stone-400">
                      by {essay.author}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <div className="max-w-md">
              <h2 className="mb-4 font-serif text-4xl font-bold text-stone-900">
                Nessun articolo trovato
              </h2>
              <p className="mb-8 font-sans text-lg leading-relaxed text-stone-600">
                Non ci sono ancora articoli in questa categoria.
              </p>
              <Link
                href="/"
                className="inline-block font-sans text-sm font-bold uppercase tracking-[0.2em] text-stone-900 transition-colors hover:text-stone-600"
              >
                ← Torna alla Home
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
