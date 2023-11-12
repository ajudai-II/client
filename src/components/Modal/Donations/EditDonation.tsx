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
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface IEditDonation {
  isOpen: boolean;
  onClose: () => void;
}

const EditDonation: React.FC<IEditDonation> = ({ isOpen, onClose }) => {
  const initialRef: any = React.useRef(null);
  const finalRef: any = React.useRef(null);

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
            <Input ref={initialRef} placeholder="Título" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descrição</FormLabel>
            <Input placeholder="Descrição" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Quantidade</FormLabel>
            <Input placeholder="Quantidade" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Editar
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditDonation;
