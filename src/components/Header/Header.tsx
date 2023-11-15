import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputRightElement, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import styles from "./header.module.scss";

const Header = () => {
  const [isLargerThan1200, isSmallerThan768] = useMediaQuery([
    "(min-width: 1200px)",
    "(max-width: 767px)",
  ]);

  const logoWidth = isLargerThan1200 ? "20%" : "25%";
  const boxWidth = isSmallerThan768 ? "90%" : "100%";

  return (
    <header>
      <Box
        w={"100%"}
        paddingBottom={4}
        paddingTop={4}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
        bgColor={"#A8B5E0"}
      >
        <Box
          w={{ base: "100%", md: logoWidth }}
          display={"flex"}
          justifyContent={"center"}
        >
          <Image
            src={"/icons/logo.svg"}
            alt={"logo do ajudai"}
            width={148}
            height={148}
          />
        </Box>
        
        <Box width={{ base: "90%", md: "60%" }}>
          <form className={styles.headerForm}>
            <InputGroup>
              <Input
                w="100%"
                bgColor={"#fff"}
                type="text"
                placeholder="Pesquisar..."
              />
              <InputRightElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputRightElement>
            </InputGroup>
          </form>
        </Box>

        <div className={styles.headerDivIcons}>
          <Box display={"flex"} alignItems={"center"} gap={4}></Box>
        </div>
      </Box>
    </header>
  );
};

export default Header;