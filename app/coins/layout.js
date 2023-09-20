import FlagCarousel from "@/FlagCarousel";
import Hero from "@/Hero";

export default function CoinsLayout({ children }) {
  return (
    <article>
      <Hero />
      <FlagCarousel />
      {children}
    </article>
  );
}
