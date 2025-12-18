import { getEssayBySlug } from "@/lib/essays";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CommentSection } from "@/components/CommentSection";
import { ReadingProgress } from "@/components/ReadingProgress";

// Custom components for MDX
const DropCap = ({ children }: { children: React.ReactNode }) => (
  <span className="float-left mr-3 mt-[-6px] font-serif text-7xl font-bold leading-none text-stone-900">
    {children}
  </span>
);

const components = {
  DropCap,
  // Style blockquotes
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote className="my-12 border-l-4 border-yellow-500 pl-6 font-serif text-2xl italic leading-relaxed text-stone-900" {...props} />
  ),
  // Style h3 headers
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="mb-6 mt-12 font-sans text-2xl font-bold text-stone-900" {...props} />
  ),
  // Style paragraphs
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="mb-8 font-serif text-xl leading-loose text-stone-800" {...props} />
  ),
};

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-paper pb-32 pt-32">
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Header */}
      <header className="mx-auto max-w-3xl px-6 text-center">
        <div className="mb-6 font-sans text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase">
          {essay.category}
        </div>
        <h1 className="mb-8 font-serif text-5xl font-bold leading-tight text-balance text-stone-900 md:text-6xl">
          {essay.title}
        </h1>
        <p className="mx-auto max-w-xl font-sans text-xl font-light leading-relaxed text-stone-600">
          {essay.subtitle}
        </p>

        {/* Metadata Divider */}
        <div className="mt-12 flex items-center justify-center gap-4 border-y border-stone-200 py-6 font-sans text-xs font-bold tracking-widest text-stone-500 uppercase">
          <span>By {essay.author}</span>
          <span className="text-stone-300">•</span>
          <span>{new Date(essay.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
      </header>

      {/* Dynamic MDX Content */}
      <div className="mx-auto mt-16 max-w-2xl px-6">
        <div className="prose prose-stone prose-lg">
          <MDXRemote source={essay.content} components={components} />
        </div>
      </div>

      {/* Author Bio Footer */}
      <footer className="mx-auto mt-24 max-w-2xl px-6">
        <div className="rounded-lg bg-stone-100 p-8">
          <h4 className="mb-2 font-sans text-sm font-bold uppercase tracking-widest text-stone-500">About the Author</h4>
          <p className="font-serif text-lg text-stone-900">
            {essay.author} is a writer and former special advisor to the chairman of the Joint Chiefs of Staff. She lived and worked in Afghanistan from 2002 to 2021, where she helped establish artisan cooperatives and studied corruption networks.
          </p>
        </div>
      </footer>

      {/* Comment Section */}
      <CommentSection slug={slug} />
    </article>
  );
}
