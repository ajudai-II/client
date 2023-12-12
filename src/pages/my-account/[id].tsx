import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Image,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import CustomInput from "@/components/Input/Input";
import schema from "@/utils/schema/MyAccount";
import axios, { AxiosError } from "axios";
import Seo from "@/components/Seo/Seo";
import { MdAddAPhoto } from "react-icons/md";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";

const MyAccount = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const toast = useToast();
  const inputFile = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState(null);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >("");
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const { name, email, phone, cpf, photo } = user;
    setValue("name", name);
    setValue("email", email);
    setValue("phone", phone);
    setValue("cpf", cpf);
    if (photo) {
      setValue("photo", photo);
    }
  }, [user, setValue]);

  const handleEditProfile = async () => {
    const formData = watch();

    try {
      await axios
        .put(`http://localhost:4000/my-account/${user._id}`, formData)
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
      <Seo title="Minha Conta" />
      <Box
        marginTop={isLargerThan768 ? (isLargerThan992 ? "2%" : "3%") : "12%"}
        fontFamily="Poppins, sans-serif"
        fontWeight={700}
        display="flex"
        justifyContent="center"
      >
        <Box w={isLargerThan768 ? (isLargerThan992 ? "45%" : "50%") : "90%"}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <input
              type="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={(e: any) => {
                setPhoto(e.target.files[0]);

                const reader = new FileReader();
                reader.onloadend = () => {
                  setSelectedImage(reader.result as string);
                };
                reader.readAsDataURL(e.target.files[0]);
              }}
            />
            <Image
              borderRadius="full"
              boxSize="200px"
              objectFit="cover"
              bgColor="gray.500"
              opacity="0.8"
              alt=""
              src={photo ? URL.createObjectURL(photo) : (selectedImage as string)}
              onClick={() => inputFile.current?.click()}
              _hover={{
                cursor: "pointer",
                opacity: 0.4,
                transition: "opacity 0.3s ease-in-out",
              }}
            />
            {!photo && (
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={2}
              >
                <MdAddAPhoto size={36} />
              </Box>
            )}
          </Box>
          <CustomInput
            label="Nome"
            type="text"
            register={register}
            name="name"
            errors={errors}
          />
          <CustomInput
            label="Email"
            type="email"
            register={register}
            name="email"
            errors={errors}
          />
          <CustomInput
            label="Número"
            type="number"
            register={register}
            name="phone"
            errors={errors}
          />
          <CustomInput
            label="CPF"
            type="number"
            register={register}
            name="cpf"
            errors={errors}
          />
          <CustomInput
            label="Senha"
            type="password"
            register={register}
            name="password"
            errors={errors}
          />
          <Box w="100%" display="flex" justifyContent="center" gap={8} pt={4}>
            <Button
              colorScheme="blackAlpha"
              size="md"
              onClick={() => router.push("/my-address")}              mt={4}
            >
              Editar endereço
            </Button>
            <Button
              colorScheme="blackAlpha"
              size="md"
              onClick={handleEditProfile}
              mt={4}
            >
              Salvar dados
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MyAccount;

