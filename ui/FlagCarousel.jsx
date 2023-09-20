"use client";
import NextLink from "next/link";
import useSWR from "swr";
import { Box, Button, Flex, Link, Stack } from "@chakra-ui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import countryKeyMapper, { countries } from "../utils/countriesMapper";

async function fetchCountries(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured fetching countries: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

export default function FlagCarousel() {
  const { data, error, isLoading } = useSWR(
    `/api/get-countries`,
    fetchCountries
  );
  console.log({ data });
  // const flags = countries?.map((item) => {
  //   const a = item.map(countryKeyMapper);
  //   console.log({ a });
  // });

  // console.log({ flags });

  // const handleFilter = (e) => {
  //   console.log(e.target.ariaLabel);
  //   // router.push(
  //   //   {
  //   //     ...router,
  //   //     query: {
  //   //       ...router.query,
  //   //       country: e.target.ariaLabel,
  //   //     },
  //   //   },
  //   //   undefined,
  //   //   { shallow: true }
  //   // );
  // };

  return (
    <Box as="section" my={12}>
      <Flex alignItems="center" justifyContent="center">
        <Stack
          direction="row"
          align="center"
          spacing={4}
          style={{ overflowX: "auto" }}
        >
          {Object.entries(countries).map(([key, value]) => (
            <Link as={NextLink} key={value} href={`/coins?country=${value}`}>
              <ReactCountryFlag
                className="emojiFlag"
                countryCode={value}
                style={{
                  fontSize: "2em",
                }}
                aria-label={value}
                title={value}
              />
            </Link>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
}
