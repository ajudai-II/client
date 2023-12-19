import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Image,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import CustomInput from "@/components/Input/Input";
import schema from "@/utils/schema/MyAccount";
import { MdAddAPhoto } from "react-icons/md";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import { api } from "@/services/api";
import Seo from "@/components/Seo/Seo";

const MyAccount = () => {
  const { user } = useUser();
  const toast = useToast();
  const inputFile = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null | string>("");
  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      cpf: user?.cpf,
      password: user?.password,
    },
  });

  const handleFileSelect = (event?: ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();
    if (event?.target?.files?.length) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setValue("picture", Object.assign(file));
    }
  };

  const handleEditProfile = async () => {
    const formData = watch();
    console.log("formData", formData);
    try {
      await api.put(`/edit/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Atualizado",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao editar perfil",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const renderPictureUpdate = () => {
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage as any);
      return imageUrl;
    }
  };

  const [isLargerThan768, isLargerThan992] = useMediaQuery([
    "(min-width: 768px)",
    "(min-width: 992px)",
  ]);

  return (
    <>
      <Seo title="Ajudai | Minha Conta" />
      <Box
        marginTop={isLargerThan768 ? (isLargerThan992 ? "2%" : "3%") : "20%"}
        marginBottom={isLargerThan768 ? (isLargerThan992 ? "2%" : "3%") : "20%"}
        fontFamily="Poppins, sans-serif"
        fontWeight={700}
        display="flex"
        justifyContent="center"
      >
        <Box
          as="form"
          onSubmit={handleSubmit(handleEditProfile)}
          w={isLargerThan768 ? (isLargerThan992 ? "45%" : "50%") : "90%"}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <input
              type="file"
              {...register("picture")}
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            <Image
              borderRadius="full"
              boxSize="120px"
              objectFit="cover"
              bgColor="gray.500"
              opacity="0.8"
              alt=""
              src={renderPictureUpdate() || user?.picture}
              onClick={() => inputFile.current?.click()}
              _hover={{
                cursor: "pointer",
                opacity: 0.4,
                transition: "opacity 0.3s ease-in-out",
              }}
            />
            {!selectedImage && (
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
          <Box w="100%" display="flex" justifyContent="center" gap={8} pt={4}>
            <Button
              colorScheme="blackAlpha"
              size="md"
              onClick={() => router.push("/my-address")}
              mt={4}
            >
              Editar endereço
            </Button>
            <Button colorScheme="blackAlpha" size="md" type="submit" mt={4}>
              Salvar dados
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MyAccount;
