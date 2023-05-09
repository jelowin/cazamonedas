import { Suspense } from "react";
import BaseLayout from "@/BaseLayout";
import CardGrid, { CardGridSkeleton } from "@/CardGrid";
import FlagCarousel from "@/FlagCarousel";
import Hero from "@/Hero";
// import { fetchUrl } from "../utils";

// const fetchMap = new Map();

// function queryClient(name, query) {
//   if (!fetchMap.has(name)) {
//     fetchMap.set(name, query());
//   }

//   return fetchMap.get(name);
// }

export default async function Home() {
  // const { rows } = await queryClient("coins", () =>
  //   fetch(`${fetchUrl}/api/coins`).then((res) => res.json())
  // );

  return (
    <BaseLayout>
      <Hero />
      <FlagCarousel />
      <Suspense fallback={<CardGridSkeleton />}>
        <CardGrid data={[]} />;
      </Suspense>
    </BaseLayout>
  );
}
