"use client";

import { Suspense } from "react";
import { Text } from "@chakra-ui/react";
import useSWR from "swr";

import CardGrid from "@/CardGrid";
import JoinCommunity from "@/JoinCommunity";
import Loading from "./loading";

async function fetchMyCoins(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured fetching coins: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

export default function MyCoinsPage() {
  const { data, error, isLoading } = useSWR(`/api/get-my-coins`, fetchMyCoins);
  console.log("PAGE", data);

  if (!data || isLoading) {
    return <Loading />;
  }

  // if (error) {
  //   return <ErrorCoinsPage />;
  // }

  return (
    <>
      <h2>My coins</h2>
      <Suspense fallback={<Loading />}>
        <CardGrid data={data?.result?.rows} />
      </Suspense>
      {/* <JoinCommunity /> */}
    </>
  );
}
