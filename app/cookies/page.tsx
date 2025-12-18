export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#FBF9F4]">
      <section className="border-b border-stone-200 bg-white">
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-4xl">
            <h1 className="mb-4 font-serif text-5xl font-bold leading-tight text-stone-900 lg:text-7xl">
              Cookies
            </h1>
            <p className="font-sans text-lg leading-relaxed text-stone-600 lg:text-xl">
              Come utilizziamo i cookie sul nostro sito
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 lg:py-24">
        <div className="prose prose-stone mx-auto max-w-3xl">
          <p className="font-sans text-lg leading-relaxed text-stone-600">
            Contenuto in fase di definizione. Questa pagina sarà aggiornata a breve con la nostra politica sui cookie completa.
          </p>
        </div>
      </section>
    </main>
  );
}
