/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CardMyDonations from "@/components/Cards/Donations/CardMyDonations";
import Seo from "@/components/Seo/Seo";
import { useGetDonationsByDonator } from "@/queries/donationQuerie";
import {
  Box,
  Button,
  ButtonGroup,
  Skeleton,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useDonation } from "@/hooks/useDonation";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import useUser from "@/hooks/useUser";
import { IDonation } from "@/@types/donation";
import ModalEditDonation from "@/components/Modal/Donations/ModalEditDonation";
import ModalDeleteDonation from "@/components/Modal/Donations/ModalDeleteDonation";

const skeletonItems = [0, 1, 2, 3, 4];

const MyDonationsPage = () => {
  const { user } = useUser();
  const { donationUpdated, setDonation } = useDonation();
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, isFetching, refetch, isRefetching } =
    useGetDonationsByDonator(`${user?._id}`, page);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();

  const openModal = (item: IDonation) => {
    console.log(item);
    setDonation(item);
    onOpen();
  };

  const openDeleteModal = (item: IDonation) => {
    setDonation(item);
    deleteOnOpen();
  };

  useEffect(() => {
    refetch();
  }, [page, data]);

  useEffect(() => {
    refetch();
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
  }, [donationUpdated, data]);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (isLoading)
    return (
      <>
        <Seo title={"Ajudaí | Minhas doações"} />

        <Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            padding={"10px"}
            gap={"10px"}
            mt={{ base: "3.1rem", md: 0 }}
          >
            {skeletonItems.map((key) => (
              <Skeleton
                key={key}
                w={{ base: "100%", md: "50%" }}
                h={"150px"}
                borderRadius={"10px"}
              />
            ))}
          </Box>
        </Box>
      </>
    );

  if (isError) return <p>Ocorreu um erro</p>;

  return (
    <Box>
      {isFetching ||
        (isRefetching && (
          <Box
            position={"fixed"}
            top={0}
            left={0}
            w={"100%"}
            h={"100%"}
            display={"flex"}
            justifyContent={"center"}
            zIndex={99999}
            overflow={"hidden !important"}
            bg={"blackAlpha.600"}
          >
            <Spinner
              marginTop={"20%"}
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              size="xl"
            />
          </Box>
        ))}
      <Seo title={"Ajudaí | Minhas doações"} />

      <Box w={"100%"}>
        {data?.data?.length ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            padding={"10px"}
            gap={"10px"}
            marginTop={{ base: "3.5rem", md: 0 }}
            paddingBottom={{ base: "4.5rem", md: "0.625rem" }}
          >
            {data?.data?.map((item: IDonation) => (
              <CardMyDonations
                openDeleteModal={() => openDeleteModal(item)}
                openEditModal={() => openModal(item)}
                picture={item.picture}
                title={item.title}
                description={item.description}
                data={data?.data}
                key={item._id}
              />
            ))}
            <ButtonGroup
              w={{ base: "100%", md: "50%" }}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                disabled={page === 1 ? true : false}
                cursor={page === 1 ? "not-allowed" : "pointer"}
                onClick={() => previousPage()}
                borderRadius={"50%"}
                p={"0.5rem"}
              >
                <ArrowBackIcon />
              </Button>
              <Text>Página {page}</Text>
              <Button
                background={"blackAlpha.900"}
                color={"white"}
                onClick={() => setPage(page + 1)}
                borderRadius={"50%"}
                p={"0.5rem"}
              >
                <ArrowForwardIcon />
              </Button>
            </ButtonGroup>
          </Box>
        ) : (
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            padding={"10px"}
            gap={"10px"}
            marginTop={{ base: "3.5rem", md: 0 }}
            paddingBottom={{ base: "4.5rem", md: "0.625rem" }}
          >
            <Text as={"h1"}>Você ainda não possui nenhuma doação</Text>
          </Box>
        )}
      </Box>
      <ModalEditDonation isOpen={isOpen} onClose={onClose} />
      <ModalDeleteDonation isOpen={deleteIsOpen} onClose={deleteOnClose} />
    </Box>
  );
};

export default MyDonationsPage;
