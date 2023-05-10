import { Suspense } from "react";
import BaseLayout from "@/BaseLayout";
import CardGrid, { CardGridSkeleton } from "@/CardGrid";
import FlagCarousel from "@/FlagCarousel";
import Hero from "@/Hero";
import { fetchUrl } from "../utils";

// const fetchMap = new Map();

// function queryClient(name, query) {
//   if (!fetchMap.has(name)) {
//     fetchMap.set(name, query());
//   }

//   return fetchMap.get(name);
// }

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  // const { rows } = await queryClient("coins", () =>
  //   fetch(`${fetchUrl}/api/coins`).then((res) => res.json())
  // );
  const data = await getData();

  return (
    <BaseLayout>
      <Hero />
      <FlagCarousel />
      <Suspense fallback={<CardGridSkeleton />}>
        <CardGrid data={data} />;
      </Suspense>
    </BaseLayout>
  );
}
