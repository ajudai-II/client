import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Link, flexbox } from "@chakra-ui/react";
import CustomInput from "@/components/Input/Input";
import Image from "next/image";
import schema from "@/utils/schema/Login";
import { api } from "@/services/api";

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
      await api.post("/login", {
        ...formData,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} w={"100%"} h={"100dvh"}>
      <Container>
        <form onSubmit={onSubmit(handleLogin)}>
          <Box display={"flex"} justifyContent={"center"} marginBottom={"80px"}>
            <Image src={"/icons/logo.svg"} alt={"logo do ajudai"} width={192} height={192} />
          </Box>

          <CustomInput label="Email" type="text" register={register} name="email" errors={errors} />

          <CustomInput label="Senha" type="password" register={register} name="password" placeholder="Digite sua senha" errors={errors} />
          <Link href="#">
            <p style={{ textDecoration: "underline", marginTop: "24px", marginBottom: "40px" }}>Esqueci minha senha</p>
          </Link>

          <Button w={"100%"} marginTop={4} colorScheme="blackAlpha" size="md" type="submit">
            Login
          </Button>
          <Box display={"flex"} justifyContent={"center"} marginTop={"48px"}>
            <span style={{ textAlign: "center" }}>Não tem uma conta?&nbsp; </span>
            <Link href="../register/index">
              <span style={{ textDecoration: "underline", fontWeight: 700 }}>Crie uma</span>
            </Link>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
