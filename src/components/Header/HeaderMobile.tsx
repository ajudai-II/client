import { ArrowBackIcon, BellIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const HeaderMobile = () => {
  const navigation = useRouter();
  return (
    <Box
      display={"flex"}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"10px"}
      pos={"relative"}
      top={0}
    >
      <Button
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        bg={"none"}
        title="Go back"
        onClick={() => navigation.back()}
      >
        <ArrowBackIcon />
      </Button>

      <Heading size={"md"} textAlign={"center"}>
        Minhas doações
      </Heading>

      <Button
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        bg={"none"}
        title="Notifications"
      >
        <BellIcon />
      </Button>
    </Box>
  );
};

export default HeaderMobile;
