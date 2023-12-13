import Seo from "@/components/Seo/Seo";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Settings = () => {
  return (
    <>
      <Seo title="Ajudai | Preferências" />

      <Box>
        <Text as={"h1"}>Preferências</Text>

        <Box>
          <Text as={"h2"}>Notificações</Text>
          <Text as={"h2"}>Dark Mode</Text>
          <Text as={"h2"}>Sobre</Text>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
