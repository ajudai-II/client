import React from "react";
import {
  Box,
  Button,
  Circle,
  HStack,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { PhoneIcon, LinkIcon } from "@chakra-ui/icons";
import Seo from "@/components/Seo/Seo";
import HomeBanner from "@/components/HomeBanner/HomeBanner";
import { useRouter } from "next/router";
import homeMock from "@/mocks/homeMock";

const DonationDetailment = () => {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  const [isLargerThan576, isLargerThan768, isLargerThan992, isLargerThan1200] =
    useMediaQuery([
      "(min-width: 576px)",
      "(min-width: 768px)",
      "(min-width: 992px)",
      "(min-width: 1200px)",
    ]);

  const selectedDonation = homeMock.find((donation) => donation._id === id);

  if (!selectedDonation) {
    return <p>Pedido não encontrado.</p>;
  }

  const options = [
    {
      icon: <PhoneIcon color="#fff" />,
      bg: "#000",
      action: () =>
        (window.location.href = `https://api.whatsapp.com/send?phone=${selectedDonation.donator.phone}`),
    },
    {
      icon: <LinkIcon color="#fff" />,
      bg: "#000",
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copiado!",
          description: "Compartilhe e ajude!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      },
    },
  ];

  return (
    <>
      <Seo title={"Ajudaí | Pedido"} />
      <Box
        display="flex"
        flexDirection={isLargerThan768 ? "row" : "column-reverse"}
        justifyContent={"center"}
      >
        <Box
          w={isLargerThan768 ? (isLargerThan992 ? "80%" : "75%") : "100%"}
          pt={6}
          justifyContent={"center"}
        >
          <HomeBanner picture={selectedDonation.picture} alt="" />
          <Box
            pt={isLargerThan768 ? "16px" : "8px"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Box width={isLargerThan768 ? "100%" : "90%"} top={0}>
              <Text
                fontSize={isLargerThan768 ? "1.8rem" : "1.5rem"}
                fontWeight="700"
              >
                {selectedDonation.title}
              </Text>
              <Text
                fontSize={isLargerThan768 ? "1.1rem" : "1rem"}
                overflow="hidden"
                textOverflow="ellipsis"
                fontWeight="500"
              >
                {selectedDonation.description}
              </Text>
              <Text
                mt={2}
                fontSize={isLargerThan768 ? "1.1rem" : "1rem"}
                overflow="hidden"
                textOverflow="ellipsis"
              >
                Categoria: {selectedDonation.category}
              </Text>
              <HStack mt={16} justifyContent={"space-between"}>
                <Button
                  fontWeight={"700"}
                  fontSize={isLargerThan992 ? "lg" : "xl"}
                  width={
                    isLargerThan576
                      ? isLargerThan768
                        ? isLargerThan992
                          ? isLargerThan1200
                            ? "450px"
                            : "350px"
                          : "300px"
                        : "320px"
                      : "200px"
                  }
                  height={isLargerThan768 ? "56px" : "48px"}
                  onClick={options[0].action}
                >
                  Quero Ajudar
                </Button>
                <Box display="flex" gap={isLargerThan768 ? "32px" : "16px"}>
                  {options.map((circle, index) => (
                    <Circle
                      key={index}
                      size={
                        isLargerThan576
                          ? isLargerThan768
                            ? isLargerThan1200
                              ? "56px"
                              : "48px"
                            : "56px"
                          : "48px"
                      }
                      bg={circle.bg}
                      cursor={"pointer"}
                      onClick={circle.action}
                    >
                      {circle.icon}
                    </Circle>
                  ))}
                </Box>
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DonationDetailment;
