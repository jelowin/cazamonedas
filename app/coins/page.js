"use client";

import { Suspense } from "react";
import { Text } from "@chakra-ui/react";
import useSWR from "swr";

import CardGrid from "../../ui/CardGrid";
import Loading from "./loading.js";
import JoinCommunity from "@/JoinCommunity";
import ErrorCoinsPage from "./error";
async function fetchCoins(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured fetching coins: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

export default function CoinsPage() {
  const { data, error, isLoading } = useSWR(`/api/get-all-coins`, fetchCoins);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <ErrorCoinsPage />;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <CardGrid data={data?.result?.rows} />
      </Suspense>
      <JoinCommunity />
    </>
  );
}
