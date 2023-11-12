/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MyDonations from "@/components/Cards/Donations/MyDonations";
import Seo from "@/components/Seo/Seo";
import { useGetDonationsByDonator } from "@/queries/donationQuerie";
import { Box, Skeleton } from "@chakra-ui/react";

const skeletonItems = [0, 1, 2, 3, 4];

const MyDonationsPage = () => {
  const [page, setPage] = useState<number>(1);

  const [isAtLastItem, setAtLastItem] = useState(false);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } =
    useGetDonationsByDonator(`6546e2b5f8510b2efe3b0fea`, page);
  const donations = data?.pages.flatMap((page) => page.data) || [];

  const checkPosition = useMemo(() => {
    return () => {
      const windowHeight = window.innerHeight;
      const currentPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      setAtLastItem(currentPosition >= documentHeight - windowHeight);

      if (currentPosition >= documentHeight - windowHeight) {
        fetchNextPage();
      }
    };
  }, [isAtLastItem, fetchNextPage, hasNextPage]);

  const handleScroll = useCallback(() => {
    checkPosition();
  }, [checkPosition]);

  useEffect(() => {
    setPage(page + 1);

    window.addEventListener("scroll", checkPosition);

    return () => {
      window.removeEventListener("scroll", checkPosition);
    };
  }, [handleScroll]);

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
          {isFetching &&
            skeletonItems.map((key) => (
              <Skeleton
                key={key}
                w={{ base: "100%", md: "50%" }}
                h={"150px"}
                borderRadius={"10px"}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MyDonationsPage;
