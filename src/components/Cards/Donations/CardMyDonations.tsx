import React from "react";
import { IDonation } from "@/@types/donation";
import ModalEditDonation from "@/components/Modal/Donations/ModalEditDonation";
import { useDonation } from "@/hooks/useDonation";
import {
  Box,
  Button,
  ButtonGroup,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalDeleteDonation from "@/components/Modal/Donations/ModalDeleteDonation";

interface IMyDonations {
  data: IDonation[];
}

const CardMyDonations: React.FC<IMyDonations> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const { setDonation } = useDonation();

  const openModal = (item: IDonation) => {
    setDonation(item);
    onOpen();
  };

  const openDeleteModal = (item: IDonation) => {
    setDonation(item);
    deleteOnOpen();
  };

  return (
    <>
      {data?.map((item) => (
        <Box
          w={{ base: "100%", md: "50%" }}
          h={"10rem"}
          display={"flex"}
          gap={"10px"}
          border={"0.5px solid #dcdcdc"}
          borderRadius={"0.625rem"}
          key={item._id}
        >
          <Image
            objectFit="cover"
            w={"40%"}
            borderRadius={"10px 0 0 10px"}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Stack h={"100%"} justifyContent={"center"}>
            {item.title.length >= 24 && item.description.length >= 24 ? (
              <>
                <Text
                  fontWeight={"600"}
                  fontFamily={{ base: "0.625rem", md: "1.2rem" }}
                >
                  {item.title.slice(0, 24)}...
                </Text>
                <Text
                  fontWeight={"400"}
                  colorScheme="gray"
                  fontFamily={{ base: "0.5rem", md: "0.625rem" }}
                >
                  {item.description.slice(0, 24)}...
                </Text>
              </>
            ) : (
              <>
                <Text
                  fontWeight={"600"}
                  fontFamily={{ base: "0.625rem", md: "1.2rem" }}
                >
                  {item.title}
                </Text>
                <Text
                  fontWeight={"400"}
                  colorScheme="gray"
                  fontFamily={{ base: "0.5rem", md: "0.625rem" }}
                >
                  {item.description}
                </Text>
              </>
            )}

            <ButtonGroup>
              <Button
                colorScheme="gray"
                variant="outline"
                fontSize={{ base: "0.8rem", md: "1rem" }}
                onClick={() => openDeleteModal(item)}
              >
                Excluir
              </Button>
              <Button
                bg="blackAlpha.900"
                color={"white"}
                fontSize={{ base: "0.8rem", md: "1rem" }}
                onClick={() => openModal(item)}
              >
                Editar
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      ))}
      <ModalEditDonation isOpen={isOpen} onClose={onClose} />
      <ModalDeleteDonation isOpen={deleteIsOpen} onClose={deleteOnClose} />
    </>
  );
};

export default CardMyDonations;
