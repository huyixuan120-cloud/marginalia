import { Hero } from "@/components/Hero";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { getAllEssays } from "@/lib/essays";

export default function Home() {
  const allEssays = getAllEssays();

  // Select hero post based on featured flag
  // Priority 1: Find an essay with featured: true
  // Priority 2: Use the most recent post (first in array)
  const featuredEssay = allEssays.find(essay => essay.featured === true);
  const heroEssay = featuredEssay || allEssays[0];

  // Get remaining essays (exclude the hero)
  const remainingEssays = allEssays.filter(essay => essay.slug !== heroEssay.slug);

  return (
    <div>
      <Hero essay={heroEssay} />
      <FeaturedGrid essays={remainingEssays} />
    </div>
  );
}
