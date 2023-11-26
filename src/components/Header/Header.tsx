import React from "react";
import Image from "next/image";
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import styles from "./header.module.scss";
import { useRouter } from "next/router";
import { headerRoutes } from "@/const/pages";
import Siderbar from "../Sidebar/Siderbar";

const Header = () => {
  const { asPath } = useRouter();

  return (
    <>
      {headerRoutes.includes(asPath) ? null : (
        <header>
          <Box
            w={"100%"}
            paddingBottom={2}
            paddingTop={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexDirection={{ base: "column", md: "row" }}
            bgColor={"#fff"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Siderbar />
              <Box display={"flex"} justifyContent={"center"}>
                <Image
                  src={"/icons/logo.svg"}
                  alt={"logo do ajudai"}
                  width={124}
                  height={124}
                />
              </Box>
            </Box>

            <Box w={{ base: "100%", md: "60%" }}>
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
      )}
    </>
  );
};

export default Header;
