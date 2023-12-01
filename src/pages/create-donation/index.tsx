import Seo from "@/components/Seo/Seo";
import {
  Box,
  Button,
  Text,
  useToast,
  Image,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { createDonationSchema } from "@/schemas/createDonation";
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosError } from "axios";
import CustomInput from "@/components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateDonation = () => {
  const {
    control,
    handleSubmit: onSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createDonationSchema) });
  const toast = useToast();
  const inputFile = useRef<HTMLInputElement>(null);
  const [foto, setFoto] = useState(null);
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>("");  

  const handleCreateDonation = async () => {
    const formData = watch();
    try {
      await axios
        .post("http://localhost:4000/create-donation", {
          ...formData,
          createdAt: new Date(),
        })
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

  const categories = ["Alimentos", "Vestuário", "Educação", "Saúde", "Outros"];

  const [isLargerThan768, isLargerThan992] = useMediaQuery([
    "(min-width: 768px)",
    "(min-width: 992px)",
  ]);

  return (
    <>
      <Seo title="Pedir uma Ajudaí" />
      <Box
        marginTop={isLargerThan768 ? (isLargerThan992 ? "2%" : "3%") : "12%"}
        fontFamily="Poppins, sans-serif"
        fontWeight={700}
        display="flex"
        justifyContent="center"
      >
        <Box w={isLargerThan768 ? (isLargerThan992 ? "45%" : "50%") : "90%"}>
          <Text textAlign="center" fontSize="1.8rem" pb={4}>
            Insira uma imagem abaixo
          </Text>
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
                setFoto(e.target.files[0]);

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
              src={foto ? URL.createObjectURL(foto) : selectedImage as string}              onClick={() => inputFile.current?.click()}
              _hover={{ cursor: "pointer", opacity: 0.4, transition: 'opacity 0.3s ease-in-out' }}
            />
            {!foto && (
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
            label="Título"
            type="text"
            register={register}
            name="title"
            placeholder="Insira o título da doação..."
            errors={errors}
          />
          <CustomInput
            label="Descrição"
            type="text"
            register={register}
            name="description"
            placeholder="Descreva seu pedido com mais detalhes..."
            errors={errors}
          />
          <Box pt="8px">
            <label>Quantidade</label>
          </Box>
          <Controller
            name="amount"
            control={control}
            defaultValue={15}
            render={({ field }) => (
              <NumberInput min={1} max={999} p="8px 0">
                <NumberInputField {...field} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
          <label>Categoria</label>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select p="8px 0" size="md" {...field}>
                <option value="" disabled>
                  Selecione uma categoria
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            )}
          />
          <Box w="100%" display="flex" justifyContent="center" pt={4}>
            <Button
              colorScheme="blackAlpha"
              size="md"
              onClick={onSubmit(handleCreateDonation)}
              mt={4}
            >
              Pedir uma Ajudaí
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateDonation;
