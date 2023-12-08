import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React, { useRef } from "react";
import DrawerComponent from "./Drawer";

const Siderbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = useRef();
  return (
    <Box>
      <Button
        p={0}
        m={0}
        ref={btnRef}
        backgroundColor={"#fff"}
        onClick={onOpen}
      >
        <HamburgerIcon w={8} h={8} />
      </Button>
      <DrawerComponent isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Siderbar;
