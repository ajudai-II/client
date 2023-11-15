import React from "react";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import styles from "./homeBanner.module.scss";

interface IHomeBannerProps {
  picture: string;
  alt: string;
  title?: string;
}

const HomeBanner: React.FC<IHomeBannerProps> = ({ picture, alt, title }) => {
  const [isLargerThan576, isLargerThan768, isLargerThan992] = useMediaQuery([
    "(min-width: 576px)",
    "(min-width: 768px)",
    "(min-width: 992px)",
  ]);

  return (
    <Box
      w={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      p={{ md: 8 }}
    >
      <Box
        w="90%"
        height={
          isLargerThan576
            ? isLargerThan768
              ? isLargerThan992
                ? "400px"
                : "350px"
              : "300px"
            : "250px"
        }
        marginTop={4}
        position="relative"
      >
        <Image
          src={picture}
          alt={alt}
          width={500}
          height={
            isLargerThan576
              ? isLargerThan768
                ? isLargerThan992
                  ? 400
                  : 350
                : 300
              : 250
          }
          className={styles.homeBannerImg}
        />
        <Text
          fontSize={isLargerThan992 ? "2.5rem" : "1.5rem"}
          position="absolute"
          bottom={4}
          left={4}
          zIndex={1}
          fontWeight="700"
          color="#fff"
        >
          {title}
        </Text>
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          backgroundColor="black"
          opacity={0.5}
          zIndex={0}
          cursor="pointer"
        />
      </Box>
    </Box>
  );
};

export default HomeBanner;
