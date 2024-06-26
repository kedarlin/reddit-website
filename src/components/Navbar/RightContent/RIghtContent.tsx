import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "../../Modal/Auth/AuthModal";
import { User, signOut } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RIghtContentProps = {
  user?: User | null;
};

const RIghtContent: React.FC<RIghtContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};
export default RIghtContent;
