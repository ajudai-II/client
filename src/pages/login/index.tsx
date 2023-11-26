import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Text, useToast } from "@chakra-ui/react";
import CustomInput from "@/components/Input/Input";
import Image from "next/image";
import schema from "@/utils/schema/Login";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const Login = () => {
  const {
    register,
    handleSubmit: onSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const toast = useToast();

  const handleLogin = async () => {
    const formData = watch();
    try {
      await api
        .post("/login", {
          ...formData,
        })
        .then(async (res) => {
          const cookies = parseCookies();
          const token: string = res.data.token;
          const refreshToken = res.data.refresh_token;
          setCookie(null, "token", token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          setCookie(null, "refreshToken", refreshToken, {
            path: "/",
          });
          window.location.href = "/";
        });
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        "Erro desconhecido";
      toast({
        title: errorMessage,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"100dvh"}
    >
      <Container>
        <form onSubmit={onSubmit(handleLogin)}>
          <Box
            w={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              src={"/icons/logo.svg"}
              alt={"logo do ajudai"}
              width={192}
              height={192}
            />
          </Box>

          <CustomInput
            label="Email"
            type="text"
            placeholder="Digite sua email"
            register={register}
            name="email"
            errors={errors}
          />

          <CustomInput
            label="Senha"
            type="password"
            register={register}
            name="password"
            placeholder="Digite sua senha"
            errors={errors}
          />

          <Button
            w={"100%"}
            marginTop={4}
            colorScheme="blackAlpha"
            size="md"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
