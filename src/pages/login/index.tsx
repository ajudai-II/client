import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Text, useToast } from "@chakra-ui/react";
import CustomInput from "@/components/Input/Input";
import Image from "next/image";
import schema from "@/utils/schema/Login";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import Seo from "@/components/Seo/Seo";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit: onSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    const formData = watch();
    try {
      await api
        .post("/login", {
          ...formData,
        })
        .then(async (res) => {
          const token: string = res.data.token;
          const refreshToken = res.data.refresh_token;
          const user_id = res.data._id;
          setCookie(null, "user_id", user_id, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          setCookie(null, "token", token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          setCookie(null, "refreshToken", refreshToken, {
            path: "/",
          });
          window.location.href = "/";
        });
      setIsLoading(false);
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
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Seo title="Ajudai | Login" />
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
              placeholder="Digite seu email"
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
              size="md"
              type="submit"
              isLoading={isLoading}
              loadingText={isLoading ? "Carregando..." : null}
              background={"blackAlpha.900"}
              color={"white"}
            >
              Login
            </Button>
          </form>
          <Box pt={8} display="flex" flexDirection="column">
            <Text fontSize="m" fontWeight="medium" textAlign={"center"}>
              Não tem uma conta?{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => router.push("/register")}
              >
                Registre-se
              </span>
              !
            </Text>
            <Text
              pt={4}
              fontSize="m"
              fontWeight="medium"
              textAlign={"center"}
              onClick={() => router.push("/recovery-password")}
              cursor="pointer"
              textDecoration="underline"
            >
              Esqueci a senha
            </Text>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
