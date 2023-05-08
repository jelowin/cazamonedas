import { Suspense } from "react";
import BaseLayout from "@/BaseLayout";
import CardGrid, { CardGridSkeleton } from "@/CardGrid";
import FlagCarousel from "@/FlagCarousel";
import Hero from "@/Hero";

// async function getData() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/coins`);
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

const fetchMap = new Map();

function queryClient(name, query) {
  if (!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }

  return fetchMap.get(name);
}
export default async function Home() {
  const { rows } = await queryClient("coins", () =>
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/coins`).then((res) =>
      res.json()
    )
  );

  return (
    <BaseLayout>
      <Hero />
      <FlagCarousel />
      <Suspense fallback={<CardGridSkeleton />}>
        <CardGrid data={rows} />;
      </Suspense>
    </BaseLayout>
  );
}
