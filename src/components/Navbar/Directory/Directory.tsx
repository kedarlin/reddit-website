import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Menu, MenuButton, MenuList, Icon, Text } from "@chakra-ui/react";
import { TiHome } from "react-icons/ti";
import Community from "./Community";

const Directory: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex
          align="center"
          justifyContent="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }} />
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={500} fontSize="10pt">
                Home
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Community />
      </MenuList>
    </Menu>
  );
};
export default Directory;
