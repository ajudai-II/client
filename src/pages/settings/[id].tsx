import useUser from "@/hooks/useUser";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import ModalDeleteAccount from "@/components/Modal/User/ModalDeleteAccount";
import { ImSad } from "react-icons/im";

const DeleteAccount = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  return (
    <Container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"100dvh"}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        minW={"100%"}
        height={"100%"}
      >
        <ImSad size={50} />
        <Box
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignContent={"center"}
        >
          <Heading color={"#16161b"} textAlign={"center"}>
            Triste ter que ser assim...
          </Heading>
          <Text textAlign={"center"}>
            Esperamos ver você por aqui novamente!
          </Text>
        </Box>

        <Box display={"flex"} p={"2rem"} pt={24}>
          <Button
            w={"100%"}
            colorScheme="blackAlpha"
            size="md"
            onClick={openDeleteModal}
          >
            Deletar minha conta
          </Button>
        </Box>
      </Box>

      <ModalDeleteAccount
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
    </Container>
  );
};

export default DeleteAccount;
