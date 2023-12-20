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

const IMAGE_URL = "https://storage.googleapis.com/ajudai-ii.appspot.com/";

interface IMyDonations {
  picture: string;
  title: string;
  description: string;
  data: IDonation;
  openDeleteModal: () => void;
  openEditModal: () => void;
}

const CardMyDonations: React.FC<IMyDonations> = ({
  picture,
  title,
  description,
  openDeleteModal,
  openEditModal,
}) => {
  function linkRemoval() {
    const removedLink = picture?.replace(IMAGE_URL!, "");
    return `${IMAGE_URL}${removedLink}`;
  }

  return (
    <>
      <Box
        w={{ base: "100%", md: "50%" }}
        h={"10rem"}
        display={"flex"}
        gap={"10px"}
        border={"0.5px solid #dcdcdc"}
        borderRadius={"0.625rem"}
      >
        <Image
          objectFit="cover"
          w={"40%"}
          borderRadius={"10px 0 0 10px"}
          src={linkRemoval()}
          alt={title}
        />

        <Stack h={"100%"} justifyContent={"center"}>
          {title.length >= 24 && description.length >= 24 ? (
            <>
              <Text
                fontWeight={"600"}
                fontFamily={{ base: "0.625rem", md: "1.2rem" }}
              >
                {title.slice(0, 24)}...
              </Text>
              <Text
                fontWeight={"400"}
                colorScheme="gray"
                fontFamily={{ base: "0.5rem", md: "0.625rem" }}
              >
                {description.slice(0, 24)}...
              </Text>
            </>
          ) : (
            <>
              <Text
                fontWeight={"600"}
                fontFamily={{ base: "0.625rem", md: "1.2rem" }}
              >
                {title}
              </Text>
              <Text
                fontWeight={"400"}
                colorScheme="gray"
                fontFamily={{ base: "0.5rem", md: "0.625rem" }}
              >
                {description}
              </Text>
            </>
          )}
          <ButtonGroup>
            <Button
              colorScheme="gray"
              variant="outline"
              fontSize={{ base: "0.8rem", md: "1rem" }}
              onClick={openDeleteModal}
            >
              Excluir
            </Button>
            <Button
              bg="blackAlpha.900"
              color={"white"}
              fontSize={{ base: "0.8rem", md: "1rem" }}
              onClick={openEditModal}
            >
              Editar
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </>
  );
};

export default CardMyDonations;
