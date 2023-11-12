import MyDonations from "@/components/Cards/Donations/MyDonations";
import HeaderMobile from "@/components/Header/HeaderMobile";
import { Box } from "@chakra-ui/react";
import React from "react";

const MyDonationsPage = () => {
  return (
    <Box w={"100%"} h={"100dvh"}>
      <HeaderMobile />

      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        padding={"10px"}
        gap={"10px"}
      >
        <MyDonations />
        <MyDonations />
        <MyDonations />
        <MyDonations />
        <MyDonations />
        <MyDonations />
        <MyDonations />
        <MyDonations />
      </Box>
    </Box>
  );
};

export default MyDonationsPage;
