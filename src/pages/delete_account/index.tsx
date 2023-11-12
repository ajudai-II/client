import { Box, Container, FormControl, FormLabel, Image, Input, Heading, Button, Text, FormHelperText } from "@chakra-ui/react";
import React from "react";

const delete_account = () => {
  return (
    <Container display={"flex"} justifyContent={"center"} alignItems={"center"} w={"100%"} h={"100dvh"}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} minW={"100%"} height={"100%"}>
        <Image w={"80px"} h={"80px"} src="/icons/sad-icon.svg" objectFit={"cover"} alt="Profile user" borderRadius={"50%"} mt={"2.375rem"} alignSelf={"center"} marginBottom={"2rem"} />

        <Box w={"100%"}>
          <Heading color={"#16161b"}>Triste ter que ser assim</Heading>
          <Text paddingBottom={"2rem"}>Esperamos ver você por aqui novamente!</Text>
        </Box>
        <FormControl>
          <FormLabel fontWeight={"700"} color={"#16161b"}>
            Insira seu email
          </FormLabel>
          <Input type="email" minW={"320px"} color={"#16161b"} />
          <FormHelperText color={"#16161b"}>Tenha em mente que essa opção não poderá ser desfeita.</FormHelperText>
        </FormControl>

        <Box>
          <Button w={"100%"} marginTop={16} color={"#fff"} background={"#fa8fb1"} size="md" type="submit">
            Deletar minha conta
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default delete_account;
