import React from "react";
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
} from "@chakra-ui/react";
import { useDonation } from "@/hooks/useDonation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import schema from "@/utils/schema/EditDonation";
import CustomInput from "@/components/Input/Input";
import { api } from "@/services/api";

interface IEditDonation {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEditDonation: React.FC<IEditDonation> = ({ isOpen, onClose }) => {
  const { donation, setDonation, setDonationUpdated } = useDonation();
  const {
    register,
    handleSubmit: onSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: donation?.title,
      description: donation?.description,
      amount: donation?.amount,
    },
  });
  const initialRef: any = React.useRef(null);
  const finalRef: any = React.useRef(null);
  const toast = useToast();

  const handleEditDonation = async () => {
    const formData = watch();
    try {
      await api
        .patch(`/update-donation/${donation?._id}`, {
          ...formData,
        })
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
