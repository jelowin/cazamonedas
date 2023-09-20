"use client";

import useSWR from "swr";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Stack,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import { ThumbsUp } from "react-feather";

async function postAddCoin(coinId) {
  const response = await fetch("/api/post-add-coin", {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      coinId,
    }),
  });

  if (!response.ok) {
    const message =
      "No hemos podido añadir la moneda a tus tengui, vuelve a intentarlo";
    toast.error(message, {
      position: "bottom-center",
    });
  }

  toast.success("Moneda añadida a tus tengui.", {
    position: "bottom-center",
  });

  const coin = await response.json();
  return coin;
}

export default function CardGrid({ data = [] }) {
  return (
    <>
      <SimpleGrid minChildWidth="250px" spacing="24px">
        {data?.length
          ? data.map((coin) => (
              <Card key={coin.id} maxW="sm" size="md" variant="elevated">
                <CardBody>
                  <Center w="100%">
                    <Img
                      alt={coin.reason}
                      boxSize="200px"
                      src={coin.image}
                      objectFit="cover"
                    />
                  </Center>
                  <Stack mt="6" spacing="3">
                    <Flex alignItems="center" justify="space-between">
                      <Text
                        as="span"
                        color="gray.600"
                        fontSize="sm"
                        fontWeight={500}
                        textTransform="uppercase"
                      >
                        {coin.country}
                      </Text>
                      <Text as="b" fontSize="md">
                        {coin.year}
                      </Text>
                    </Flex>
                    <Text fontSize="md">{coin.reason}</Text>
                  </Stack>
                  <Button colorScheme="yellow" variant="link">
                    Ver más
                  </Button>
                </CardBody>
                <CardFooter>
                  <Center w="100%">
                    <Button
                      width="100%"
                      variant="solid"
                      colorScheme="yellow"
                      onClick={() => postAddCoin(coin.id)}
                      rightIcon={<ThumbsUp size={18} />}
                    >
                      Tengui
                    </Button>
                  </Center>
                </CardFooter>
              </Card>
            ))
          : null}
      </SimpleGrid>
      <Toaster />
    </>
  );
}

export function CardGridSkeleton() {
  return (
    <SimpleGrid minChildWidth="250px" spacing="24px">
      {Array.from(Array(8)).map((_, index) => (
        <Skeleton key={index} height="455px" width="auto" />
      ))}
    </SimpleGrid>
  );
}
