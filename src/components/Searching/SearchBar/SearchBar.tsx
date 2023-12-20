import React, { useState, ChangeEvent } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <Box width={"100%"}>
      <form>
        <InputGroup>
          <Input
            w="100%"
            bgColor={"#fff"}
            type="text"
            placeholder="Pesquisar..."
            value={searchValue}
            onChange={handleChange}
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
