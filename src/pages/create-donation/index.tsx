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
import React, { ChangeEvent, useRef, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { createDonationSchema } from "@/schemas/createDonation";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "@/components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@/services/api";
import { useDonation } from "@/hooks/useDonation";
import useUser from "@/hooks/useUser";

const CreateDonation = () => {
  const { donation } = useDonation();
  const { user } = useUser();
  const toast = useToast();
  const inputFile = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null | string>("");
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createDonationSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: 1,
      category: "",
      picture: null,
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

  const handleCreateDonation = async () => {
    const formData = watch();
  
    console.log("formData", formData);
  try {
    await api.post("/create-donation", {
      ...formData,
      id: user._id,
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
      toast({
        title: "Erro ao criar doação",
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

  const categories = ["Alimentos", "Vestuário", "Educação", "Saúde", "Outros"];

  const [isLargerThan768, isLargerThan992] = useMediaQuery([
    "(min-width: 768px)",
    "(min-width: 992px)",
  ]);

  return (
    <>
      <Seo title="Pedir uma Ajudaí" />
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
          onSubmit={handleSubmit(handleCreateDonation)}
          encType="multipart/form-data"
          w={isLargerThan768 ? (isLargerThan992 ? "45%" : "50%") : "90%"}
        >
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
              src={renderPictureUpdate() || donation?.picture}
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
            defaultValue={1}
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
            <Button colorScheme="blackAlpha" size="md" type="submit" mt={4}>
              Pedir uma Ajudaí
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateDonation;
