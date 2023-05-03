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
  Text,
} from "@chakra-ui/react";

export default async function CoinsGrid() {
  const coins = [
    {
      country: "Francia",
      description:
        "Jacques Chirac, presidente de la República Francesa durante dos mandatos, fue uno de los principales artífices de la construcción europea. Era presidente cuando se introdujo el euro en 2002, cuyo vigésimo aniversario celebramos a principios de este año. El diseño muestra un perfil solemne del presidente Jacques Chirac mirando hacia el futuro, rodeado de varios símbolos que representan su legado",
      image:
        "https://www.ecb.europa.eu/euro/coins/comm/shared/img/comm_2022_jacques_chirac_90.jpg",
      issueDate: "enero de 2022",
      issueVolum: "9 millones de monedas",
      reason:
        "Nonagésimo aniversario del nacimiento del presidente Jacques Chirac",
      year: "2022",
    },
  ];
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
    >
      {coins.map((coin, index) => (
        <Card key={index} maxW="sm">
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
