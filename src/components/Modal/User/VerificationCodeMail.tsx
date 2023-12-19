import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  useToast,
} from "@chakra-ui/react";
import CustomInput from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

const schema = yup.object().shape({
  recoveryCode: yup.string().required("Campo obrigatório"),
});

const VerificationCodeModal = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(600);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isOpen, countdown]);

  const handleVerificationCodeSubmit = async () => {
    try {
      setIsLoading(true);
      const { recoveryCode } = watch();
      const response = await axios.post("http://localhost:4000/verify-code", {
        recoveryCode,
      });

      if (response.status === 200) {
        const { token, userId } = response.data;
        setCookie(null, "user_token", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        setCookie(null, "user_id", userId, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        router.push(`/change-password/${token}`);
        toast({
          title: "Código de recuperação válido",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("Error verifying recovery code");
      }
    } catch (error) {
      console.error("Error verifying recovery code", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <CustomInput
            label="Código de Verificação"
            type="text"
            name="recoveryCode"
            register={register}
            placeholder="Digite o código recebido por e-mail"
            errors={errors}
          />
          {errors.recoveryCode && (
            <Text color="red" fontSize="sm">
              {errors.recoveryCode.message}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Text fontSize="sm" color="gray.500">
            Tempo restante: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
          </Text>
          <Box marginLeft={4}>
            {isLoading ? (
              <Spinner color="green.500" size="md" />
            ) : (
              <Button colorScheme="green" onClick={handleSubmit(handleVerificationCodeSubmit)}>
                Enviar
              </Button>
            )}
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VerificationCodeModal;
