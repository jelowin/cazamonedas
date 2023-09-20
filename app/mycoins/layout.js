import FlagCarousel from "@/FlagCarousel";
import Hero from "@/Hero";

export default function MyCoinsLayout({ children }) {
  return (
    <section>
      <Hero />
      <nav>
        <FlagCarousel />
      </nav>
      {children}
    </section>
  );
}
