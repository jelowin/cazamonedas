"use client";
import { Box, Text } from "@chakra-ui/react";

export default function JoinCommunity() {
  return (
    <Box w="full" ml="auto" mr="auto" boxSizing="border-box">
      <Text
        as="h3"
        fontSize={{ base: "md", md: "xl" }}
        fontWeight="bold"
        align="center"
      >
        Únete a Nuestra Comunidad Numismática
      </Text>
      <Text as="p" fontSize={{ base: "sm", md: "md" }} align="center">
        Te invitamos a explorar nuestra colección, participar en discusiones en
        línea y disfrutar de la riqueza de la numismática. Ya seas un
        coleccionista experimentado o estés empezando tu viaje en el mundo de
        las monedas, aquí encontrarás un espacio dedicado a tu pasión.
        ¡Bienvenido a nuestra comunidad numismática!
      </Text>
    </Box>
  );
}
