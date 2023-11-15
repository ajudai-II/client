import React from "react";
import { Box, Button, Text, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import styles from "./homeDonation.module.scss";

interface IHomeDonationProps {
  picture: string;
  alt: string;
  title: string;
  id?: number;
}

const HomeDonation: React.FC<IHomeDonationProps> = ({
  picture,
  alt,
  title,
  id,
}) => {
  const [isLargerThan768, isLargerThan992] = useMediaQuery([
    "(min-width: 768px)",
    "(min-width: 992px)",
  ]);

  return (
    <Box
      width={isLargerThan768 ? "70%" : "60%"}
      display="flex"
      gap={6}
      justifyContent="center"
      alignItems="center"
      borderRadius="16px"
      bgColor="#D9D9D9"
      maxHeight="200px"
      overflow="hidden"
      mb={"2"}
    >
      <Box
        width={isLargerThan768 ? "40%" : "60%"}
        height="200px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="#bbbbbb"
      >
        <div className={styles.circularImage}>
          <Image src={picture} alt={title} width={100} height={100} />
        </div>
      </Box>
      <Box width="100%" maxHeight="200px" paddingRight={4}>
        <Text
          fontSize={isLargerThan992 ? "xl" : isLargerThan768 ? "lg" : "md"}
          fontWeight="bold"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {title.length > 80 ? `${title.substring(0, 80)}...` : title}
        </Text>

        <Text
          fontSize={isLargerThan992 ? "s" : "sm"}
          overflow="hidden"
          textOverflow="ellipsis"
          display="-webkit-box"
        >
          {alt.length > 50 ? `${alt.substring(0, 50)}...` : alt}
        </Text>

          <Button
            as="a"
            variant="solid"
            colorScheme="pink"
            marginTop={4}
            fontSize={isLargerThan992 ? "md" : "sm"}
            width={isLargerThan992 ? "250px" : "150px"}
            cursor="pointer"
          >
            Ver pedido
          </Button>
      </Box>
    </Box>
  );
};

export default HomeDonation;