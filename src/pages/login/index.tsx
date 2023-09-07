import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container } from "@chakra-ui/react";
import CustomInput from "@/components/Input/Input";
import axios from "axios";
import Image from "next/image";
import schema from "@/utils/schema/Login";

const Login = () => {
  const {
    register,
    handleSubmit: onSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleLogin = async () => {
    const formData = watch();
    try {
      await axios.post("http://localhost:4000/login", {
        ...formData,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Erro na solicitação:", error);
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
          <Image
            src={"/icons/logo.svg"}
            alt={"logo do ajudai"}
            width={192}
            height={192}
          />

          <CustomInput
            label="Email"
            type="text"
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
