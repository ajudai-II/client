import React, { useRef } from "react";
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
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import styles from "./Sidebar.module.scss";

interface IDrawerComponent {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DrawerComponent: React.FC<IDrawerComponent> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const [isLargerThan768, isLargerThan992] = useMediaQuery([
    "(min-width: 768px)",
    "(min-width: 992px)",
  ]);
  const btnRef: any = useRef();

  const sidebarWidth = isLargerThan992
    ? "25%"
    : isLargerThan768
    ? "30%"
    : "100%";

  const menuItems = ["Home", "Perfil", "Pedidos"];

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
          >
            Sair
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
