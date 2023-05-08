"use client";
import { Box, Stack } from "@chakra-ui/react";

export default function BaseLayout({ children }) {
  return (
    <Box
      as="main"
      boxSizing="border-box"
      flex="1 1 0"
      maxW="container.xl"
      ml="auto"
      mr="auto"
      my={16}
      w="full"
    >
      <Stack spacing={16}>{children}</Stack>
    </Box>
  );
}
