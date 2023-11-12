import MyDonations from "@/components/Cards/Donations/MyDonations";
import Seo from "@/components/Seo/Seo";
import { useGetDonationsByDonator } from "@/queries/donationQuerie";
import { Box, Skeleton } from "@chakra-ui/react";
import React, { useState } from "react";

const skeletonItems = [0, 1, 2, 3, 4];

const MyDonationsPage = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError } = useGetDonationsByDonator(
    `6546e2b5f8510b2efe3b0fea?page=${page}`
  );

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
          <MyDonations data={data?.data} />
        </Box>
      </Box>
    </Box>
  );
};

export default MyDonationsPage;
