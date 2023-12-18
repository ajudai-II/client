import { useState } from "react";
import axios from "axios";
import useUser from "@/hooks/useUser";
import nookies from "nookies";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

interface IDeleteAccount {
  isOpen: boolean;
  onClose: () => void;
}

const ModalDeleteAccount: React.FC<IDeleteAccount> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const { user } = useUser();
  const toast = useToast();

  const handleLogout = () => {
    try {
      localStorage.clear();
      nookies.destroy(null, "token", null);
      nookies.destroy(null, "refreshToken", null);
      nookies.destroy(null, "user_id", null);
      window.location.href = "/login";
    } catch (error) {
      console.error("logout error", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/delete-account/${user._id}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      handleLogout();
      onClose();
    } catch (error) {
      console.error("Erro: ", (error as Error).message);

      toast({
        title: "Erro ao deletar conta",
        description: "Houve um erro ao deletar a conta. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirme sua senha</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" onClick={handleDelete}>
            Confirmar
          </Button>
          <Button variant="red" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteAccount;
