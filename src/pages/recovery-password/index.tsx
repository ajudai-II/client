import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import Seo from "@/components/Seo/Seo";
import CustomInput from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import VerificationCodeModal from "@/components/Modal/User/VerificationCodeMail";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
});

const RecoveryPassword = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const toast = useToast();
  const router = useRouter();
  const [isVerificationCodeModalOpen, setVerificationCodeModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendVerificationCode = async () => {
    try {
      setIsLoading(true);
      const { email } = watch();
      const response = await axios.post(
        `http://localhost:4000/recovery-password`,
        {
          email,
        }
      );

      if (response.status === 200) {
        toast({
          title: "Código enviado com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setVerificationCodeModalOpen(true);
        const newUrl = "/verify-code";
        window.history.replaceState({ path: newUrl }, "", newUrl);
      } else {
        toast({
          title: "Erro ao enviar código",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Erro ao enviar código por e-mail:", error);
      toast({
        title: "Erro ao enviar código",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationCodeSubmit = async (verificationCode) => {
    // Handle the submission of the verification code, e.g., make a request to verify the code
    // ...

    // Close the modal
    setVerificationCodeModalOpen(false);
  };

  return (
    <>
      <Seo title="Ajudai | Recuperação de Senha" />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        h={"100vh"}
      >
        <Container>
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
            type="email"
            register={register}
            name="email"
            placeholder="Digite seu endereço de e-mail"
            errors={errors}
          />
          {errors.email && (
            <Text color="red" fontSize="sm">
              {errors.email.message}
            </Text>
          )}
          <Button
            width="100%"
            marginTop={4}
            size="md"
            type="submit"
            background={"blackAlpha.900"}
            color={"white"}
            onClick={handleSendVerificationCode}
            mt={"32px"}
          >
            {isLoading ? (
              <Spinner size="sm" color="white" marginRight={2} />
            ) : null}
            Enviar código
          </Button>
          <VerificationCodeModal
            isOpen={isVerificationCodeModalOpen}
            onClose={() => setVerificationCodeModalOpen(false)}
            onSubmit={handleVerificationCodeSubmit}
          />
        </Container>
      </Box>
    </>
  );
};

export default RecoveryPassword;
