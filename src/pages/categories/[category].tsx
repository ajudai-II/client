/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Seo from "@/components/Seo/Seo";
import { useGetDonationsByCategory } from "@/queries/donationQuerie";
import { Box, Button, ButtonGroup, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import CardDonationsByCategory from "@/components/Cards/Donations/CardDonationsByCategory";
import { useRouter } from "next/router";
import homeMock from "@/mocks/homeMock";

const CategoryDonationsPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [page, setPage] = useState<number>(1);
  const data = homeMock;
  const itemsPerPage = 5;

  const {
    data,
    isLoading,
    isError,
    isFetching,
    isRefetching,
    refetch
  } = useGetDonationsByCategory(category as string, page);

  useEffect(() => {
    refetch();
  }, [page, category]);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    const totalItems = data.filter((item) => item.category === category).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (isLoading)
    return (
      <>
        <Seo title={`Ajudaí | Doações em ${category}`} />

        <Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            padding={"10px"}
            gap={"10px"}
            mt={{ base: "3.1rem", md: 0 }}
          >
            {[...Array(itemsPerPage)].map((_, index) => (
              <Skeleton
                key={index}
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
      <Seo title={`Ajudaí | Doações em ${category}`} />

      <Box w={"100%"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          padding={"10px"}
          gap={"10px"}
          marginTop={{ base: "3.5rem", md: 0 }}
          paddingBottom={{ base: "4.5rem", md: "0.625rem" }}
        >
          <CardDonationsByCategory data={homeMock} category={category} />
          <ButtonGroup
            w={{ base: "100%", md: "50%" }}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={4}
          >
            <Button
              disabled={page === 1}
              cursor={page === 1 ? "not-allowed" : "pointer"}
              onClick={() => previousPage()}
              borderRadius={"50%"}
              p={"0.5rem"}
            >
              <ArrowBackIcon />
            </Button>
            <Text>Página {page}</Text>
            <Button
              disabled={page * itemsPerPage >= data.length}
              cursor={page * itemsPerPage >= data.length ? "not-allowed" : "pointer"}
              background={"blackAlpha.900"}
              color={"white"}
              onClick={() => nextPage()}
              borderRadius={"50%"}
              p={"0.5rem"}
            >
              <ArrowForwardIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryDonationsPage;
