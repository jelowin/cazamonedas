"use client";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Box w="full" ml="auto" mr="auto" boxSizing="border-box">
      <Stack align="center" spacing={4}>
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="extrabold"
        >
          Caza monedas
        </Heading>
        <Text as="p" fontSize={{ base: "xl", md: "2xl" }} align="center">
          Colecciona todas las monedas de dos euros conmemorativas de la Unión
          Europea
        </Text>
      </Stack>
    </Box>
  );
}
