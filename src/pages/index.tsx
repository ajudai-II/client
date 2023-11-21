import React from "react";
import {
  Box,
  Circle,
  VStack,
  Text,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  GiBookmarklet,
  GiClothes,
  GiHealthNormal,
  GiKnifeFork,
  GiTicket,
} from "react-icons/gi";
import Carousel from "@/components/Carousel/Carousel";
import Header from "@/components/Header/Header";
import HomeDonation from "@/components/HomeDonation/homeDonation";
import MobileNav from "@/components/MobileNav/MobileNav";
import Seo from "@/components/Seo/Seo";
import Sidebar from "@/components/Sidebar/Sidebar";
import { homeMock } from "@/mocks/homeMock";

const categories = [
  { icon: <GiKnifeFork size={32} />, label: "Alimentação" },
  { icon: <GiClothes size={32} />, label: "Vestuário" },
  { icon: <GiBookmarklet size={32} />, label: "Educação" },
  { icon: <GiHealthNormal size={32} />, label: "Saúde" },
  { icon: <GiTicket size={32} />, label: "Outros" },
];

const Home = () => {
  const [isLargerThan768, isLargerThan992] = useMediaQuery([
    "(min-width: 768px)",
    "(min-width: 992px)",
  ]);

  return (
    <>
      <Seo title={"Ajudaí | Homepage"} />
      <Header />
      <Box
        display="flex"
        flexDirection={isLargerThan768 ? "row" : "column-reverse"}
      >
        {isLargerThan768 && <Sidebar />}
        <Box w={isLargerThan768 ? (isLargerThan992 ? "80%" : "75%") : "100%"}>
          <HStack
            justify="center"
            gap={"2rem"}
            align="center"
            fontSize="lg"
            mt={12}
            mb={8}
          >
            {categories.map(({ icon, label }, index) => (
              <VStack key={index}>
                <Circle
                  size={isLargerThan992 ? "72px" : "64px"}
                  bg="#E9E9E9"
                  color="#fff"
                  cursor="pointer"
                >
                  {icon}
                </Circle>
                <Text mt={0.5} fontSize="sm" fontWeight="medium">
                  {label}
                </Text>
              </VStack>
            ))}
          </HStack>
          <Carousel />
          <VStack spacing="20px" mt="64px" mb="72px">
            {homeMock.map((item) => (
              <HomeDonation
                key={item.id}
                picture={item.picture}
                title={item.title}
                alt={item.description}
              />
            ))}
          </VStack>
        </Box>
      </Box>
      {!isLargerThan992 && <MobileNav />}
    </>
  );
};

export default Home;
