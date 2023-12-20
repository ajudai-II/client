import React, { ChangeEvent, useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useToast,
  Image,
  Box,
} from "@chakra-ui/react";
import { useDonation } from "@/hooks/useDonation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import schema from "@/utils/schema/EditDonation";
import CustomInput from "@/components/Input/Input";
import { api } from "@/services/api";
import { MdAddAPhoto } from "react-icons/md";

interface IEditDonation {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEditDonation: React.FC<IEditDonation> = ({ isOpen, onClose }) => {
  const { donation, setDonation, setDonationUpdated } = useDonation();
  const [selectedImage, setSelectedImage] = useState<File | null | string>("");
  const {
    register,
    handleSubmit: onSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: donation?.title,
      description: donation?.description,
      picture: donation?.picture,
      amount: donation?.amount,
    },
  });
  const initialRef: any = React.useRef(null);
  const finalRef: any = React.useRef(null);
  const toast = useToast();
  const inputFile = useRef<HTMLInputElement>(null);

  const handleEditDonation = async () => {
    const formData = watch();
    try {
      await api
        .patch(
          `/update-donation/${donation?._id}`,
          {
            ...formData,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toast({
            title: "Doação editada com sucesso!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setDonation({
            _id: "",
            title: "",
            description: "",
            amount: 0,
            picture: "",
            isValidated: false,
            donator: {
              name: "",
              email: "",
              phone: "",
              adress: "",
              _id: "",
            },
          });
          setDonationUpdated(res.data);
          onClose();
        });
    } catch (error) {
      toast({
        title: "Erro ao editar doação",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleCancel = () => {
    setDonation({
      _id: "",
      title: "",
      description: "",
      amount: 0,
      picture: "",
      isValidated: false,
      donator: {
        name: "",
        email: "",
        phone: "",
        adress: "",
        _id: "",
      },
    });
    setDonationUpdated({});
    onClose();
  };

  const handleFileSelect = (event?: ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();
    if (event?.target?.files?.length) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setValue("picture", Object.assign(file));
    }
  };

  const renderPictureUpdate = () => {
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage as any);
      return imageUrl;
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar doação</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
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
              {!selectedImage ||
                (donation?.picture && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    zIndex={2}
                  >
                    <MdAddAPhoto size={36} />
                  </Box>
                ))}
            </Box>
            <FormLabel>Título</FormLabel>
            <CustomInput
              type="text"
              register={register}
              name="title"
              errors={errors}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descrição</FormLabel>
            <CustomInput
              type="text"
              register={register}
              name="description"
              errors={errors}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Quantidade</FormLabel>
            <CustomInput
              type="number"
              register={register}
              name="amount"
              errors={errors}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="gray"
            variant="outline"
            fontSize={{ base: "0.8rem", md: "1rem" }}
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            bg="blackAlpha.900"
            color={"white"}
            fontSize={{ base: "0.8rem", md: "1rem" }}
            mr={3}
            onClick={() => handleEditDonation()}
          >
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditDonation;
