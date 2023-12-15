/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Seo from "@/components/Seo/Seo";
import {
  Box,
  Button,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import CardDonationsByCategory from "@/components/Cards/Donations/CardDonationsByCategory";
import { useRouter } from "next/router";
import homeMock from "@/mocks/homeMock";

const CategoryDonationsPage = () => {
  const router = useRouter();
  const { query } = router;
  const { category } = query;
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 5;

  const totalItems = homeMock.filter(
    (item) => item.category === category
  ).length;

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    fetchData().then(() => setPage(1));
  }, [category]);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const isFetching = false;

  return (
    <>
      <Seo title={`Ajudaí | Doações em ${category}`} />
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        padding={"10px"}
        gap={"10px"}
        marginTop={{ base: "3.5rem", md: 0 }}
        paddingBottom={{ base: "4.5rem", md: "0.625rem" }}
      >
        {totalItems === 0 ? (
          <>
            <Text pt={"16"} fontWeight={"700"} fontSize={"2rem"}>
              Não há doações nesta categoria.
            </Text>{" "}
            <Button onClick={() => router.push("/")}>Go back home</Button>
          </>
        ) : (
          <>
            {isFetching || (
              <>
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
                    disabled={page * itemsPerPage >= totalItems}
                    cursor={
                      page * itemsPerPage >= totalItems
                        ? "not-allowed"
                        : "pointer"
                    }
                    background={"blackAlpha.900"}
                    color={"white"}
                    onClick={() => nextPage()}
                    borderRadius={"50%"}
                    p={"0.5rem"}
                  >
                    <ArrowForwardIcon />
                  </Button>
                </ButtonGroup>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default CategoryDonationsPage;
