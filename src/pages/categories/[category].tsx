/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Seo from "@/components/Seo/Seo";
import { useGetDonationsByCategory } from "@/queries/donationQuerie";
import { Box, Button, ButtonGroup, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import CardMyDonations from "@/components/Cards/Donations/CardMyDonations";
const skeletonItems = [0, 1, 2, 3, 4];

const CategoryDonationsPage = ({category}) => {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    isFetching,
    isRefetching,
    refetch
  } = useGetDonationsByCategory(category);

  useEffect(() => {
    refetch();
  }, [page, category]);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (isLoading)
    return (
      <>
        <Seo title={`Ajudaí | Doações na Categoria ${category}`} />

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
      <Seo title={`Ajudaí | Doações na Categoria ${category}`} />

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
          {data?.pages.map((page: { data: any[]; }, pageIndex: React.Key | null | undefined) => (
            <React.Fragment key={pageIndex}>
              {page.data.map((donation) => (
                <CardMyDonations key={donation._id} data={donation} />
              ))}
            </React.Fragment>
          ))}
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
              disabled={!data?.pages[page - 1]?.hasNextPage}
              cursor={!data?.pages[page - 1]?.hasNextPage ? "not-allowed" : "pointer"}
              onClick={() => setPage(page + 1)}
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
