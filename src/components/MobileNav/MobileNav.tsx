import React from "react";
import { Box, Text } from "@chakra-ui/react";
import style from "./mobileNav.module.scss";
import {
  BsFillHouseDoorFill,
  BsFillPersonFill,
  BsList,
  BsXLg,
} from "react-icons/bs";
import { useRouter } from "next/router";

const iconsNav = [
  { icon: BsFillHouseDoorFill, label: "Home", path: "/" },
  { icon: BsFillPersonFill, label: "Perfil", path: "/profile" },
  { icon: BsList, label: "Doações", path: "/my-donations" },
  { icon: BsXLg, label: "Sair", path: "/logout" },
];

const MobileNav = () => {
  const navigation = useRouter();

  return (
    <nav className={style.mobileNav}>
      <Box
        w="100%"
        p={1.5}
        bgColor="#A8B5E0"
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
        {iconsNav.map(({ icon: Icon, label, path }, index) => (
          <Box
            key={index}
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            onClick={() => navigation.push(path)}
          >
            <Icon color="#fff" size={24} cursor="pointer" />
            <Text color="#fff" fontSize="xs" mt={1} fontWeight="medium">
              {label}
            </Text>
          </Box>
        ))}
      </Box>
    </nav>
  );
};

export default MobileNav;
