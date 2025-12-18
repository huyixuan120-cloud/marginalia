import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const essaysDirectory = path.join(process.cwd(), 'content/essays');

export interface Essay {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  featured?: boolean;
}

/**
 * Get all essays from the content/essays directory
 * Returns essays sorted by date (newest first)
 */
export function getAllEssays(): Essay[] {
  // Get all .mdx files in the essays directory
  const fileNames = fs.readdirSync(essaysDirectory);

  const allEssays = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      // Remove ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx$/, '');

      // Read markdown file as string
      const fullPath = path.join(essaysDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        subtitle: data.subtitle,
        category: data.category,
        author: data.author,
        date: data.date || data.publishedAt || '',
        image: data.image,
        excerpt: data.excerpt,
        content,
        featured: data.featured || false,
      };
    });

  // Sort essays by date (newest first)
  return allEssays.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get a single essay by slug
 */
export function getEssayBySlug(slug: string): Essay | null {
  try {
    const fullPath = path.join(essaysDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      subtitle: data.subtitle,
      category: data.category,
      author: data.author,
      date: data.date || data.publishedAt || '',
      image: data.image,
      excerpt: data.excerpt,
      content,
      featured: data.featured || false,
    };
  } catch (error) {
    console.error(`Error reading essay ${slug}:`, error);
    return null;
  }
}

/**
 * Get all essay slugs (for static path generation)
 */
export function getAllEssaySlugs(): string[] {
  const fileNames = fs.readdirSync(essaysDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
