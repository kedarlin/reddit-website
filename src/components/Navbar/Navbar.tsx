import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInputs";
import RIghtContent from "./RightContent/RIghtContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory/Directory";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex bg="white" height="44px" padding="6px 12px" justify={{md:"dpace-between"}}>
      <Flex align="center" width={{base: "40px", md: "auto"}} mr={{base: 0, md: 2}}>
        <Image src="/images/redditFace.svg" height="30px" alt="reddit-face"/>
        <Image
          src="/images/redditText.svg"
          height="46px"
          display={{ base: "none", md: "unset" }}
          alt="reddit-text"
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RIghtContent user={user} />
    </Flex>
  );
};
export default Navbar;
