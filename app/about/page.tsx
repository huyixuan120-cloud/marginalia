export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper py-32">
      <article className="container mx-auto max-w-3xl px-6">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="mb-6 font-serif text-5xl font-bold text-stone-900 md:text-6xl">
            About Marginalia
          </h1>
          <p className="mx-auto max-w-2xl font-sans text-xl text-stone-600">
            Notes in the margins of modern life
          </p>
        </header>

        {/* Manifesto Content */}
        <div className="space-y-8 font-serif text-xl leading-loose text-stone-800">
          <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:font-bold first-letter:text-stone-900">
            In an age of infinite scroll and perpetual distraction, Marginalia exists as a sanctuary for slow reading and deep thought. We believe that the most important ideas cannot be consumed in a feed, understood in a headline, or reduced to a thread. They require time, attention, and the willingness to sit with complexity.
          </p>

          <p>
            Our essays explore the intersection of philosophy, culture, technology, and the human condition. We write for readers who value depth over speed, who understand that some questions have no easy answers, and who find beauty in the space between certainty and doubt. Like marginalia—those handwritten notes in the borders of old books—our work exists in conversation with the world's great ideas, adding commentary, critique, and contemplation.
          </p>

          <p>
            We resist the attention economy's demand for hot takes and viral content. Instead, we embrace what the German thinkers called <em>Bildung</em>: the slow cultivation of wisdom through careful reading, reflection, and dialogue. Our writers spend weeks crafting essays that you might read in twenty minutes but think about for years. This is intentional. We're not optimizing for engagement metrics; we're optimizing for meaning.
          </p>

          <p>
            Marginalia is for anyone tired of the endless noise, anyone who still believes that ideas matter, anyone who wants to reclaim their attention from the algorithms. We publish weekly essays on topics that resist easy categorization: the ethics of technology, the nature of memory, the architecture of cities, the philosophy of work, the science of consciousness. Our only criterion is that the writing makes you think differently about something you thought you understood.
          </p>

          <blockquote className="my-12 border-l-4 border-yellow-500 pl-6 italic text-stone-700">
            "In the margins, we find space to think. In the margins, we resist the tyranny of the main text. In the margins, we become ourselves."
          </blockquote>

          <p>
            Join us in the margins. Read slowly. Think deeply. Take notes. Question everything. And remember: the most important conversations happen not in the center of the page, but in the spaces we create for reflection.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-24 border-t border-stone-200 pt-12 text-center">
          <h2 className="mb-4 font-serif text-2xl font-bold text-stone-900">Get in Touch</h2>
          <p className="mb-6 font-sans text-stone-600">
            We'd love to hear from you. Whether you have a story idea, feedback, or just want to say hello.
          </p>
          <a
            href="mailto:hello@marginalia.com"
            className="inline-block font-sans text-lg font-medium text-stone-900 underline decoration-yellow-500 decoration-2 underline-offset-4 transition-colors hover:text-stone-600"
          >
            hello@marginalia.com
          </a>
        </div>
      </article>
    </div>
  );
}
