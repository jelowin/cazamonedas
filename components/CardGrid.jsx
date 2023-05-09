"use client";

import {
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

export default async function CardGrid({ data = [] }) {
  return (
    <SimpleGrid
      // spacing={4}
      // templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      minChildWidth="250px"
      spacing="24px"
    >
      {data?.length &&
        data.map((coin) => (
          <Card key={coin.id} maxW="sm" size="md" variant="elevated">
            <CardBody>
              <Center>
                <Img
                  alt={coin.reason}
                  boxSize="200px"
                  src={coin.image}
                  objectFit="cover"
                />
              </Center>
              <Stack mt="6" spacing="3">
                <Flex justify="space-between">
                  <Heading size="md">{coin.country}</Heading>
                  <Text as="b" fontSize="lg">
                    {coin.year}
                  </Text>
                </Flex>
                <Text fontSize="md">{coin.reason}</Text>
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
                  La tengo
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  La quiero
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
    </SimpleGrid>
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
