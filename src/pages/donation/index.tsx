import React from "react";
import {
  Box,
  Button,
  Circle,
  HStack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { PhoneIcon, LinkIcon } from "@chakra-ui/icons";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import Seo from "@/components/Seo/Seo";
import HomeBanner from "@/components/HomeBanner/HomeBanner";
import { homeMock } from "@/mocks/homeMock";

const DonationDetailment = () => {
  const [isLargerThan576, isLargerThan768, isLargerThan992, isLargerThan1200] =
    useMediaQuery([
      "(min-width: 576px)",
      "(min-width: 768px)",
      "(min-width: 992px)",
      "(min-width: 1200px)",
    ]);

  const firstItem = homeMock[0];

  const options = [
    { icon: <PhoneIcon color="#fff" />, bg: "#48BB78" },
    { icon: <LinkIcon color="#fff" />, bg: "#48BB78" },
  ];

  return (
    <>
      <Seo title={"Ajudaí | Pedido"} />
      <Header />
      <Box
        display="flex"
        flexDirection={isLargerThan768 ? "row" : "column-reverse"}
      >
        {isLargerThan768 && <Sidebar />}
        <Box
          w={isLargerThan768 ? (isLargerThan992 ? "80%" : "75%") : "100%"}
          pt={6}
        >
          <HomeBanner picture={firstItem.picture} alt="" />
          <Box
            p={{ md: 8 }}
            paddingTop={4}
            display={"flex"}
            justifyContent={"center"}
          >
            <Box width="90%" top={0}>
              <Text fontSize={isLargerThan768 ? "1.8rem" : "1.5rem"} fontWeight="700">
                {firstItem.title}
              </Text>
              <Text
                fontSize={isLargerThan768 ? "1.1rem" : "1rem"}
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {firstItem.description}
              </Text>
              <HStack mt={16} justifyContent={"space-between"}>
                <Button
                  variant="solid"
                  colorScheme="pink"
                  fontWeight={"700"}
                  fontSize={isLargerThan992 ? "lg" : "xl"}
                  width={
                    isLargerThan576
                      ? isLargerThan768
                        ? isLargerThan992
                          ? isLargerThan1200
                            ? "600px"
                            : "450px"
                          : "350px"
                        : "400px"
                      : "300px"
                  }
                  height={isLargerThan768 ? "56px" : "48px"}
                >
                  Quero Ajudar
                </Button>
                {options.map((circle, index) => (
                  <Circle
                    key={index}
                    size={
                      isLargerThan576
                        ? isLargerThan768
                          ? isLargerThan1200
                            ? "72px"
                            : "64px"
                          : "64px"
                        : "56px"
                    }
                    bg={circle.bg}
                    cursor={"pointer"}
                  >
                    {circle.icon}
                  </Circle>
                ))}
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>
      <MobileNav />
    </>
  );
};

export default DonationDetailment;
