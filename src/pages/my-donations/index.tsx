/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MyDonations from "@/components/Cards/Donations/MyDonations";
import Seo from "@/components/Seo/Seo";
import { useGetDonationsByDonator } from "@/queries/donationQuerie";
import { Box, Skeleton, Spinner } from "@chakra-ui/react";
import { useDonation } from "@/hooks/useDonation";

const skeletonItems = [0, 1, 2, 3, 4];

const MyDonationsPage = () => {
  const [page, setPage] = useState<number>(1);

  const [isAtLastItem, setAtLastItem] = useState(false);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
    isRefetching,
  } = useGetDonationsByDonator(`6546e2b5f8510b2efe3b0fea`, page);

  const { donationUpdated, setDonation } = useDonation();

  const donations = data?.pages.flatMap((page) => page.data) || [];

  const checkPosition = useMemo(() => {
    return () => {
      const windowHeight = window.innerHeight;
      const currentPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      setAtLastItem(currentPosition >= documentHeight - windowHeight);

      if (currentPosition >= documentHeight - windowHeight) {
        setPage(page + 1);

        fetchNextPage();
      }
    };
  }, [isAtLastItem, fetchNextPage, hasNextPage]);

  const handleScroll = useCallback(() => {
    checkPosition();
  }, [checkPosition]);

  useEffect(() => {
    window.addEventListener("scroll", checkPosition);

    return () => {
      window.removeEventListener("scroll", checkPosition);
    };
  }, [handleScroll]);

  useEffect(() => {
    setPage(1);
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
    refetch();
  }, [donationUpdated]);

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
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          padding={"10px"}
          gap={"10px"}
          marginTop={{ base: "3.5rem", md: 0 }}
          paddingBottom={{ base: "4.5rem", md: "0.625rem" }}
        >
          <MyDonations data={donations} />
        </Box>
      </Box>
    </Box>
  );
};

export default MyDonationsPage;
