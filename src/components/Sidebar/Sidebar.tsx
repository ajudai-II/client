import React from "react";
import { Box, Text, Button, useMediaQuery } from "@chakra-ui/react";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  const [isLargerThan768, isLargerThan992] = useMediaQuery([
    "(min-width: 768px)",
    "(min-width: 992px)",
  ]);

  const sidebarWidth = isLargerThan992
    ? "25%"
    : isLargerThan768
    ? "30%"
    : "100%";

  const menuItems = ["Home", "Perfil", "Pedidos"];

  return (
    <Box w={sidebarWidth} p="16px" bg="#A8B5E0" display="flex" flexDir="column">
      {menuItems.map((item, index) => (
        <Text
          key={index}
          color="#000"
          fontSize="24px"
          fontWeight="bold"
          className={styles.sidebarText}
        >
          {item}
        </Text>
      ))}
      <Button variant="solid" fontWeight={"700"} colorScheme="pink" mt={16}>
        Sair
      </Button>
    </Box>
  );
};

export default Sidebar;
