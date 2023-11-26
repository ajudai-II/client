import React, { useRef } from "react";
import nookies from "nookies";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery,
  Box,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import styles from "./Sidebar.module.scss";

interface IDrawerComponent {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerComponent: React.FC<IDrawerComponent> = ({ isOpen, onClose }) => {
  const btnRef: any = useRef();

  const menuItems = ["Home", "Perfil", "Pedidos"];

  const handleLogout = () => {
    try {
      localStorage.clear();
      nookies.destroy(null, "token", null);
      nookies.destroy(null, "refreshToken", null);

      window.location.href = "/login";
    } catch (error) {
      console.error("logout error", error);
    }
  };
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          <Input placeholder="Type here..." />
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
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="solid"
            fontWeight={"700"}
            colorScheme="blackAlpha"
            mt={16}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
