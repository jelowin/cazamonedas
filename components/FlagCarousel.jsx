"use client";
import { Box, Button, Stack } from "@chakra-ui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { countries } from "../utils/countriesMapper";

export default function FlagCarousel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const handleFilter = (e) => {
    params.set("country", e?.target?.ariaLabel);
    router.replace(`${pathname}?${params}`);
  };

  return (
    <Box w="full" ml="auto" mr="auto" px={4} boxSizing="border-box">
      <Stack direction="row" align="center" spacing={4}>
        {Object.entries(countries).map(([key, value]) => (
          <Button key={key} onClick={handleFilter}>
            <ReactCountryFlag
              className="emojiFlag"
              countryCode={key}
              style={{
                fontSize: "2em",
                lineHeight: "2em",
              }}
              aria-label={value}
            />
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
