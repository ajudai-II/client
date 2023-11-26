import React from "react";
import styles from "./searchBar.module.scss";
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

const SearchBar = () => {
  return (
    <Box width={"100%"}>
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
  );
};

export default SearchBar;
