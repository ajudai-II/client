import { Box, Container, Image, Heading, Button, Text } from "@chakra-ui/react";
import Axios from "axios";
import React from "react";

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    try {
      const response = await Axios.delete("YOUR_SERVER_URL/api/users/:userId");
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
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
        <Image
          w={"80px"}
          h={"80px"}
          src="/icons/sad-icon.svg"
          objectFit={"cover"}
          alt="Profile user"
          borderRadius={"50%"}
          mt={"2.375rem"}
          alignSelf={"center"}
          marginBottom={"2rem"}
        />

        <Box
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignContent={"center"}
        >
          <Heading color={"#16161b"} textAlign={"center"}>
            Triste ter que ser assim
          </Heading>
          <Text textAlign={"center"}>
            Esperamos ver você por aqui novamente!
          </Text>
        </Box>

        <Box display={"flex"} p={"2rem"}>
          <Button
            w={"100%"}
            color={"#fff"}
            background={"#fa8fb1"}
            size="md"
            onClick={handleDeleteAccount}
          >
            Deletar minha conta
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default DeleteAccount;
