import { Suspense } from "react";
import BaseLayout from "@/BaseLayout";
import CardGrid, { CardGridSkeleton } from "@/CardGrid";
import FlagCarousel from "@/FlagCarousel";
import Hero from "@/Hero";
import { fetchUrl } from "../utils";

async function getData() {
  const res = await fetch(`${fetchUrl}/api/coins`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const { rows } = data;

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
