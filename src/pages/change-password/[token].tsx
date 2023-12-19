import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Spinner,
  useToast,
  Container,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomInput from "@/components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Image from "next/image";
import router from "next/router";
import { destroyCookie, parseCookies } from "nookies";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(8, "No mínimo 8 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Senhas devem coincidir")
    .required("Campo obrigatório"),
});

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChangePassword = async () => {
    try {
      setIsLoading(true);
      const { password } = watch();
      const { user_id: id } = parseCookies();
      const response = await axios.put(
        `http://localhost:4000/change-password`,
        { password, id }
      );
      console.log(response.data);
      destroyCookie(null, "user_id");
      destroyCookie(null, "user_token");
      toast({
        title: "Senha alterada com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/login");
    } catch (error) {
      console.error("Error changing password", error);

      toast({
        title: "Erro ao alterar senha",
        description: "Houve um erro ao alterar a senha. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"100vh"}
    >
      <Container>
        <form onSubmit={handleSubmit(handleChangePassword)}>
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
            label="Senha"
            type="password"
            name="password"
            register={register}
            placeholder="Digite sua nova senha"
            errors={errors}
          />
          <CustomInput
            label="Confirmar Senha"
            type="password"
            name="confirmPassword"
            register={register}
            placeholder="Confirme sua nova senha"
            errors={errors}
          />
          <Button
            width="100%"
            marginTop={"32px"}
            size="md"
            type="submit"
            colorScheme="green"
            onClick={handleSubmit(handleChangePassword)}
          >
            {isLoading ? (
              <Spinner size="sm" color="white" marginRight={2} />
            ) : null}
            Alterar Senha
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default ChangePassword;
