"use client";
import { Box, Center, Text } from "@chakra-ui/react";
import CardGrid from "@/CardGrid";

export default function BaseLayout({ children }) {
  return (
    <Box
      as="main"
      w="full"
      ml="auto"
      mr="auto"
      maxW="container.lg"
      px={4}
      boxSizing="border-box"
    >
      <Center>
        <Text fontSize="6xl">Box 1</Text>
      </Center>
      <CardGrid />
    </Box>
  );
}
