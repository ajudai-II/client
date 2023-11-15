import React from "react";
import { Box, Text } from "@chakra-ui/react";
import style from "./mobileNav.module.scss";
import { BsFillHouseDoorFill, BsFillPersonFill, BsList, BsXLg } from "react-icons/bs";

const iconsNav = [
  { icon: BsFillHouseDoorFill, label: "Home" },
  { icon: BsFillPersonFill, label: "Perfil" },
  { icon: BsList, label: "Pedidos" },
  { icon: BsXLg, label: "Sair" },
];

const MobileNav = () => {
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
        {iconsNav.map(({ icon: Icon, label }, index) => (
          <Box key={index} textAlign="center" display="flex" flexDirection="column" alignItems="center">
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