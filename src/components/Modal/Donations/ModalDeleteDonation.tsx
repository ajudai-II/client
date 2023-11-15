import CustomInput from "@/components/Input/Input";
import { useDonation } from "@/hooks/useDonation";
import register from "@/pages/register";
import { useGetDonationsByDonator } from "@/queries/donationQuerie";
import { api } from "@/services/api";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";

interface IDeleteDonation {
  isOpen: boolean;
  onClose: () => void;
}

const ModalDeleteDonation: React.FC<IDeleteDonation> = ({
  isOpen,
  onClose,
}) => {
  const { donation, setDonation, setDonationUpdated } = useDonation();
  const { refetch } = useGetDonationsByDonator(`6546e2b5f8510b2efe3b0fea`);

  const toast = useToast();
  const initialRef: any = React.useRef(null);
  const finalRef: any = React.useRef(null);

  const handleDeleteDonation = async () => {
    await api
      .delete(`/delete-donation/${donation?._id}`)
      .then(() => {
        toast({
          title: "Doação deletada com sucesso!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
        refetch();
      })
      .catch((error) => {
        toast({
          title: "Erro ao deletar doação",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.error(error);
      });
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
        <ModalHeader>Deletar doação</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text>Deseja mesmo deletar a doação: {donation?.title}?</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="gray"
            variant="outline"
            fontSize={{ base: "0.8rem", md: "1rem" }}
            onClick={() => handleCancel()}
          >
            Cancelar
          </Button>
          <Button
            bg="blackAlpha.900"
            color={"white"}
            fontSize={{ base: "0.8rem", md: "1rem" }}
            mr={3}
            onClick={() => handleDeleteDonation()}
          >
            Excluir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteDonation;
