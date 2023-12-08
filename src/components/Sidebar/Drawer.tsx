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
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import styles from "./Sidebar.module.scss";
import { useRouter } from "next/router";

interface IDrawerComponent {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerComponent: React.FC<IDrawerComponent> = ({ isOpen, onClose }) => {
  const btnRef: any = useRef();
  const navigation = useRouter();

  const iconsNav = [
    { label: "Home", path: "/" },
    { label: "Perfil", path: "/profile" },
    { label: "Doações", path: "/my-donations" },
    { label: "Opções", path: "/settings" },
  ];
  const handleLogout = () => {
    try {
      localStorage.clear();
      nookies.destroy(null, "token", null);
      nookies.destroy(null, "refreshToken", null);
      nookies.destroy(null, "user_id", null);
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
          {iconsNav.map((item, index) => (
            <Text
              key={index}
              color="#000"
              fontSize="24px"
              fontWeight="bold"
              className={styles.sidebarText}
              onClick={() => {
                navigation.push(item.path), onClose();
              }}
            >
              {item.label}
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
