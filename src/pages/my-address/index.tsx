import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, useMediaQuery, useToast } from "@chakra-ui/react";
import CustomInput from "@/components/Input/Input";
import schema from "@/utils/schema/Address";
import axios, { AxiosError } from "axios";
import Seo from "@/components/Seo/Seo";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";

const MyAddress = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const {user} = useUser();
  const toast = useToast();
  const router = useRouter();
  
  const handleCEPBlur = async () => {
    const cep = watch("cep");

    if (cep) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        setValue("uf", response.data.uf);
        setValue("city", response.data.localidade);
        setValue("neighborhood", response.data.bairro);
        setValue("street", response.data.logradouro);
      } catch (error) {
        console.error("Erro ao obter endereço pelo CEP:", error);
        toast({
          title: "Erro ao obter endereço",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    const addresses = user && user.addresses ? user.addresses : [];
    const lastAddressIndex = addresses.length - 1;
    const lastAddress = lastAddressIndex >= 0 ? addresses[lastAddressIndex] : null;
    if (lastAddress) {
      setValue("cep", lastAddress.cep);
      setValue("uf", lastAddress.uf);
      setValue("city", lastAddress.city);
      setValue("neighborhood", lastAddress.neighborhood);
      setValue("street", lastAddress.street);
      setValue("number", lastAddress.number);
      setValue("complement", lastAddress.complement);
    }
  }, [user, setValue]);

  useEffect(() => {
    const delay = 1000;
  
    const handleCEPChange = async () => {
      handleCEPBlur();
    };
  
    const timer = setTimeout(handleCEPChange, delay);
  
    return () => {
      clearTimeout(timer);
    };
  }, [watch("cep")]);

  const handleEditAddress = async () => {
    const formData = watch();
    try {
      await axios
        .post(`http://localhost:4000/my-address/${user._id}`, formData)
        .then((res) => {
          toast({
            title: res.data.message,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.error("Erro na solicitação:", error);
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

  const [isLargerThan768, isLargerThan992] = useMediaQuery([
    "(min-width: 768px)",
    "(min-width: 992px)",
  ]);

  return (
    <>
      <Seo title="Meu Endereço" />
      <Box
        marginTop={isLargerThan768 ? "2%" : "20%"}
        fontFamily="Poppins, sans-serif"
        fontWeight={700}
        display="flex"
        justifyContent="center"
      >
        <Box w={isLargerThan768 ? (isLargerThan992 ? "45%" : "50%") : "90%"}>
          <CustomInput
            label="CEP"
            type="text"
            register={register}
            name="cep"
            errors={errors}
            onBlur={handleCEPBlur}
          />
          <CustomInput
            label="UF"
            type="text"
            register={register}
            name="uf"
            errors={errors}
          />
          <CustomInput
            label="Cidade"
            type="text"
            register={register}
            name="city"
            errors={errors}
          />
          <CustomInput
            label="Bairro"
            type="text"
            register={register}
            name="neighborhood"
            errors={errors}
          />
          <CustomInput
            label="Logradouro"
            type="text"
            register={register}
            name="street"
            errors={errors}
          />
          <CustomInput
            label="Número"
            type="number"
            register={register}
            name="number"
            errors={errors}
          />
          <CustomInput
            label="Complemento"
            type="text"
            register={register}
            name="complement"
            errors={errors}
          />
          <Box w="100%" display="flex" justifyContent="center" gap={8} pt={4}>
            <Button
              colorScheme="blackAlpha"
              size="md"
              onClick={() => router.push("/my-account")}
              mt={4}
            >
              Voltar
            </Button>

            <Button
              colorScheme="blackAlpha"
              size="md"
              onClick={handleEditAddress}
              mt={4}
            >
              Salvar endereço
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MyAddress;
