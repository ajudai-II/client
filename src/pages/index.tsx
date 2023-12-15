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
import MobileNav from "@/components/MobileNav/MobileNav";
import Seo from "@/components/Seo/Seo";
import homeMock from "@/mocks/homeMock";
import SearchBar from "@/components/Searching/SearchBar/SearchBar";
import CardHome from "@/components/Cards/Home/CardHome";
import { useRouter } from "next/router";

const categories = [
  { icon: <GiKnifeFork size={32} />, label: "Alimentos" },
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

  const router = useRouter();

  const handleCategoryClick = (categoryLabel: string) => {
    router.push(`/categories/${categoryLabel.toLowerCase()}`);
  };

  return (
    <Box as="main">
      <Seo title={"Ajudaí | Homepage"} />
      <Box
        w={"100%"}
        h={"100%"}
        display="flex"
        alignItems={"center"}
        flexDirection={"column-reverse"}
      >
        <Box w={"95%"}>
          {isLargerThan768 ? null : (
            <Box marginTop={"4rem"}>
              <SearchBar />
            </Box>
          )}

          <Box position={"relative"}>
            <Carousel />
          </Box>

          <Box>
            <HStack
              justify="center"
              gap={"0.625rem"}
              align="center"
              fontSize="lg"
              mt={"4rem"}
              mb={"2rem"}
            >
              {categories.map(({ icon, label }, index) => (
                <Box key={index} onClick={() => handleCategoryClick(label)}>
                  <Circle
                    size={isLargerThan992 ? "72px" : "64px"}
                    bg="#E9E9E9"
                    color="#fff"
                    cursor="pointer"
                  >
                    {icon}
                  </Circle>
                  <Text
                    mt={0.5}
                    fontSize="sm"
                    fontWeight="medium"
                    textAlign={"center"}
                  >
                    {label}
                  </Text>
                </Box>
              ))}
            </HStack>
          </Box>

          <Box
            w={isLargerThan992 ? "100%" : "unset"}
            display={"flex"}
            justifyContent={"center"}
          >
            <VStack
              w={isLargerThan992 ? "88%" : "unset"}
              spacing="10px"
              mt="40px"
              mb="72px"
            >
              <CardHome data={homeMock} />
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
