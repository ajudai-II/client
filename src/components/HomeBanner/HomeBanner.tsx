import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import styles from "./homeBanner.module.scss";

interface IHomeBannerProps {
  picture: string;
  alt: string;
  title: string;
}

const HomeBanner: React.FC<IHomeBannerProps> = ({ picture, alt, title }) => {
  return (
    <Box
      w={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      p={{ base: 4, md: 8 }}
    >
      <Box w={"500px"} height={"250px"} marginTop={4}>
        <Image
          src={picture}
          alt={alt}
          width={500}
          height={250}
          className={styles.homeBannerImg}
        />
        <Text fontSize="xl">{title}</Text>
      </Box>
    </Box>
  );
};

export default HomeBanner;
