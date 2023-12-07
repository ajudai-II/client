import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, useMediaQuery, useToast } from "@chakra-ui/react";
import CustomInput from "@/components/Input/Input";
import schema from "@/utils/schema/Address";
import axios, { AxiosError } from "axios";
import Seo from "@/components/Seo/Seo";
import { useRouter } from "next/router";

const MyAccount = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const toast = useToast();
  const [foto, setFoto] = useState(null);
  const router = useRouter();

  const handleCEPBlur = async () => {
    const cep = watch("cep");

    if (cep) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        console.log("Response from ViaCEP:", response.data);

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
    let timer: string | number | NodeJS.Timeout | undefined;
    const delay = 1000;

    const handleCEPChange = async () => {
      clearTimeout(timer);

      timer = setTimeout(async () => {
        handleCEPBlur();
      }, delay);
    };

    handleCEPChange();

    return () => {
      clearTimeout(timer);
    };
  }, [watch("cep")]);

  const handleEditProfile = async () => {
    const formData = watch();
    const userId = "655e32d3c173f5508a3cef2d";

    try {
      await axios
        .put(`http://localhost:4000/address/${userId}`, formData)
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
        marginTop={isLargerThan768 ? (isLargerThan992 ? "2%" : "3%") : "12%"}
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
              onClick={handleEditProfile}
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

export default MyAccount;
