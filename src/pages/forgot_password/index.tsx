import { Box, Button, Container, FormControl, FormLabel, Image, Input } from "@chakra-ui/react";
import React from "react";

const forgot_password = () => {
  return (
    <Container>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} w={"100%"} h={"100vh"} background={"red"}>
        <Image src={"/icons/icon-mobile.svg"} alt={"logo do ajudai"} width={50} height={58} />
        <h1>Esqueci minha senha</h1>
        <FormControl paddingTop={"3rem"}>
          <FormLabel fontWeight={700} fontSize={"0.75rem"}>
            Enviar
          </FormLabel>
          <Input type="text" />
        </FormControl>

        <Button
          w={"14.5rem"}
          h={"3rem"}
          marginTop="16.25rem" // Empurra o botão para a parte inferior
          colorScheme="blackAlpha"
          size="md"
          type="submit"
        >
          Enviar
        </Button>
      </Box>
    </Container>
  );
};

export default forgot_password;
