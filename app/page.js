import { Suspense } from "react";
import BaseLayout from "@/BaseLayout";
import CardGrid, { CardGridSkeleton } from "@/CardGrid";
import FlagCarousel from "@/FlagCarousel";
import Hero from "@/Hero";
import { fetchUrl } from "../utils";

async function getData() {
  const response = await fetch(`${fetchUrl}/api/coins`, { cache: "no-store" });

  if (!response.ok) {
    const message = `An error has occured fetching data: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

export default async function Home() {
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
