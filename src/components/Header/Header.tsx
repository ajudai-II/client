import { SearchIcon, SettingsIcon, SunIcon, BellIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header>
      <Box
        w={"100%"}
        p={4}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
        bgColor={"#fff"}
      >
        <Image
          src={"/icons/logo.svg"}
          alt={"logo do ajudai"}
          width={148}
          height={148}
        />
        <form className={styles.headerForm}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              w={"100%"}
              bgColor={"#fff"}
              type="text"
              placeholder="Pesquisar..."
            />
          </InputGroup>
        </form>

        <div className={styles.headerDivIcons}>
          <Box display={"flex"} alignItems={"center"} gap={4}>
            <SettingsIcon color={"#fff"} w={6} h={6} cursor={"pointer"} />
            <SunIcon color={"#fff"} w={6} h={6} cursor={"pointer"} />
            <BellIcon color={"#fff"} w={6} h={6} cursor={"pointer"} />
          </Box>
        </div>
      </Box>
    </header>
  );
};

export default Header;
