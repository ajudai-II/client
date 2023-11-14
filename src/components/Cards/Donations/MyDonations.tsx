import { IDonation } from "@/@types/donation";
import DeleteDonation from "@/components/Modal/Donations/DeleteDonation";
import EditDonation from "@/components/Modal/Donations/EditDonation";
import { useDonation } from "@/hooks/useDonation";
import { useGetDonationsByDonator } from "@/queries/donationQuerie";
import { api } from "@/services/api";
import {
  Box,
  Button,
  ButtonGroup,
  Image,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";

interface IMyDonations {
  data: IDonation[];
}

const MyDonations: React.FC<IMyDonations> = ({ data }) => {
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
          display={"flex"}
          h={"150px"}
          gap={"10px"}
          border={"0.5px solid #dcdcdc"}
          borderRadius={"10px"}
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
            {item.title.length >= 24 && item.description.length >= 96 ? (
              <>
                <Text>{item.title.slice(0, 24)}...</Text>
                <Text>{item.description.slice(0, 96)}...</Text>
              </>
            ) : (
              <>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
              </>
            )}

            <ButtonGroup>
              <Button
                bg={"blue.500"}
                color={"white"}
                onClick={() => openModal(item)}
              >
                Editar
              </Button>
              <Button
                bg={"red.500"}
                color={"white"}
                onClick={() => openDeleteModal(item)}
              >
                Excluir
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      ))}
      <EditDonation isOpen={isOpen} onClose={onClose} />
      <DeleteDonation isOpen={deleteIsOpen} onClose={deleteOnClose} />
    </>
  );
};

export default MyDonations;
