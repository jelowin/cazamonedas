import { Suspense } from "react";
import BaseLayout from "@/BaseLayout";
import CardGrid, { CardGridSkeleton } from "@/CardGrid";
import FlagCarousel from "@/FlagCarousel";
import Hero from "@/Hero";
import { fetchUrl } from "../utils";

async function getData() {
  const response = await fetch(`${fetchUrl}/api/coins`);

  if (!response.ok) {
    const message = `An error has occured fetching data: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

export default async function Home() {
  const { rows } = getData();

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
