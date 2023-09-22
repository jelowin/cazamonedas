"use client";

import { useRef } from "react";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useMediaQuery,
  Stack,
  useColorMode,
  Center,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
} from "@chakra-ui/react";
import {
  GitHub,
  Grid,
  Heart,
  Home,
  Moon,
  Sun,
  Menu as MenuIcon,
} from "react-feather";

const NavLink = (props) => {
  const { children, href } = props;

  return (
    <Link as={NextLink} href={href}>
      {children}
    </Link>
  );
};

const NavItem = ({ children, icon, onClick }) => {
  return (
    <Stack
      direction="row"
      p={4}
      align="center"
      cursor="pointer"
      outline="none"
      _hover={{
        bg: "gray.100",
      }}
      _focus={{ boxShadow: "outline" }}
      spacing={2}
      onClick={onClick}
    >
      {icon ?? null}

      <Text fontSize="md" flex={1}>
        {children}
      </Text>
    </Stack>
  );
};

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  const [isMobileOrTable] = useMediaQuery("(max-width: 789px)");

  return (
    <>
      <Box as="nav" bg={useColorModeValue("gray.50", "gray.900")} mb={8} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"flex-end"}>
          <Flex alignItems="center">
            {isMobileOrTable ? (
              <>
                <Button
                  leftIcon={<MenuIcon />}
                  ref={btnRef}
                  colorScheme="transparent"
                  variant="ghost"
                  onClick={onOpen}
                />
                <Drawer
                  isOpen={isOpen}
                  placement="right"
                  onClose={onClose}
                  finalFocusRef={btnRef}
                >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menú</DrawerHeader>

                    <DrawerBody>
                      <Stack direction="column" spacing={6}>
                        <NavLink href="/home">
                          <NavItem icon={<Home />} onClick={onClose}>
                            Home
                          </NavItem>
                        </NavLink>
                        <NavLink href="/coins">
                          <NavItem icon={<Grid />} onClick={onClose}>
                            Todas las monedas
                          </NavItem>
                        </NavLink>
                        <NavLink href="/mycoins">
                          <NavItem icon={<Heart />} onClick={onClose}>
                            Mis monedas
                          </NavItem>
                        </NavLink>
                      </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                      <Stack direction="row">
                        <GitHub mx="2px" />
                        <Text fontSize="md" flex={1}>
                          Made by {""}
                          <NavLink href="https://github.com/jelowin" isExternal>
                            @jelowing
                          </NavLink>
                        </Text>
                      </Stack>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </>
            ) : (
              <Stack alignItems="center" direction={"row"} spacing={6}>
                <NavLink href="/home">Home</NavLink>
                <NavLink href="/coins">Todas las monedas</NavLink>
                <NavLink href="/mycoins">Mis monedas</NavLink>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <Moon /> : <Sun />}
                </Button>

                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
