import Seo from "@/components/Seo/Seo";
import useUser from "@/hooks/useUser";
import {
  Box,
  Text,
  Switch,
  VStack,
  Heading,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Settings = () => {
  const router = useRouter();
  const { user } = useUser();

  const { colorMode, toggleColorMode } = useColorMode();

  const handleDeleteAccount = () => {
    router.push(`/delete-account/${user._id}`);
  };

  console.log(user._id);

  return (
    <>
      <Seo title="Ajudaí | Preferências" />

      <Box p={4}>
        <Heading as="h1" mb={4}>
          Preferências
        </Heading>

        <VStack align="start" spacing={4}>
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Notificações
            </Text>
            <Switch colorScheme="teal" />
          </Box>

          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Dark Mode
            </Text>
            <Switch
              colorScheme="teal"
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />
          </Box>

          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Deletar conta
            </Text>
            <Button
              w={"100%"}
              size="md"
              onClick={handleDeleteAccount}
            >
              Continuar
            </Button>
          </Box>

          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Sobre
            </Text>
            <Text>
              Ajudaí, uma plataforma dedicada a fortalecer laços humanos por
              meio da solidariedade. Aqui, acreditamos na força transformadora
              da ajuda mútua, construindo uma comunidade onde todos têm a
              oportunidade de contribuir para um bem comum.
            </Text>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default Settings;
