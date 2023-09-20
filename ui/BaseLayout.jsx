"use client";
import { Box, Button, Stack } from "@chakra-ui/react";
import Navbar from "@/Navbar";

export default function BaseLayout({ children }) {
  return (
    <Box
      as="main"
      bg="gray.50"
      boxSizing="border-box"
      flex="1 1 0"
      maxW="container.xl"
      ml="auto"
      mr="auto"
      my={8}
      px={4}
      w="full"
    >
      <Navbar />
      <Stack spacing={16}>{children}</Stack>
    </Box>
  );
}
