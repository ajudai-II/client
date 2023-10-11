import Header from "@/components/Header/Header";
import { Box, Button, Container, Image, Text } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import React from "react";

export default function myProfile() {
  return (
    <>
      <Header />
      <Container>
        <Box display="flex" flexDirection={"column"} alignContent="center" justifyContent={"center"}>
          <Image w={232} h={232} src="https://i.pinimg.com/originals/6e/24/b0/6e24b0ab10971eb2affa91484af59161.png" objectFit={"cover"} alt="Profile user" borderRadius={"9999px"} mt={"2.375rem"} alignSelf={"center"} />

          <Text fontWeight={700} paddingTop={"1.5rem"} fontSize="2rem" textAlign={"center"}>
            User Name
          </Text>

          <form action="">
            <FormControl paddingTop={"3rem"}>
              <FormLabel fontWeight={700} fontSize={"0.75rem"}>
                Nome
              </FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl paddingTop={"1.5rem"}>
              <FormLabel fontWeight={700} fontSize={"0.75rem"}>
                Email
              </FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl paddingTop={"1.5rem"}>
              <FormLabel fontWeight={700} fontSize={"0.75rem"}>
                Senha
              </FormLabel>
              <Input type="password" />
              <FormHelperText fontSize={"0.75rem"} color={"#fa8fb1"}>
                A ajudaí nunca irá pedir sua senha.
              </FormHelperText>
            </FormControl>

            <FormControl paddingTop={"1.5rem"} fontSize={"0.75rem"}>
              <FormLabel fontWeight={700} fontSize={"0.75rem"}>
                CPF
              </FormLabel>
              <Input type="number" maxLength={14} placeholder="123.456.789-01" />
            </FormControl>

            <FormControl paddingTop={"1.5rem"}>
              <FormLabel fontWeight={700} fontSize={"0.75rem"}>
                Cidade
              </FormLabel>
              <Input type="number" />
            </FormControl>

            <Box display={"flex"} justifyContent={"center"}>
              <Button backgroundColor={"#a8b5e0"} w={232} h={"48px"} marginTop={"2rem"} marginBottom={"1.5rem"}>
                Alterar
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
