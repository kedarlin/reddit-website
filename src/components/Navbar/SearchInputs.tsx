import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { color } from 'framer-motion';
import React from 'react';

type SearchInputProps = {
    user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({user}) => {

    return (
      <Flex flexGrow={1} mr={2} width={user ? "auto" : "400px"} align="center">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.400" mb={1} />}
          />
          <Input
            placeholder="Search Reddit"
            fontSize="10pt"
            _placeholder={{ color: "gray.500" }}
            _hover={{
              bg: "white",
              boder: "1px solid",
              borderColor: "blue.500",
            }}
            _focus={{
              outline: "none",
              border: "1px solid",
              borderRadius: "blue.500",
            }}
            height="34px"
            bg="gray.50"
          />
        </InputGroup>
      </Flex>
    );
}
export default SearchInput;