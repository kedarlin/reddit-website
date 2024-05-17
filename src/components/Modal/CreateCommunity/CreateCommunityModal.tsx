import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
  ModalOverlay,
  Box,
  Divider,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firestore, auth } from "../../../firebase/clientApp";
import React, { useState } from "react";
import { BsFillPersonFill, BsFillEyeFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import useDirectory from "@/src/hooks/useDirectory";

type CreateCommunityProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunity: React.FC<CreateCommunityProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toggleMenuOpen } = useDirectory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  const communityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(event.target.name);
  };
  const handleCreateCommunity = async () => {
    if (error) setError("");
    //here we validate the community name already exists!

    const format = /[ '!@#$%^&*()+\-=\[\]{};':'\\|,.\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community name must be between 3-21 characters, and can only contain letter, number, nunderscore"
      );
      return;
    }
    setLoading(true);
    try {
      //name check
      const communityDocRef = doc(firestore, "communities", communityName);
      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/ ${communityName} is taken, try another`);
        }
        //creating
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        //create community snippet
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
      handleClose();
      toggleMenuOpen();
      router.push(`r/${communityName}`);

    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={700}>Name</Text>
              <Text>
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text color={charsRemaining === 0 ? "red" : "gray.500"}>
                {charsRemaining} Character remaining
              </Text>
              <Text fontSize="9pt" color="red" mt={2}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={communityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={2}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        (Anyone can view, post and comment to this community)
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={communityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={2}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        (Anyone can view this community, but only approved users
                        can post)
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={communityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={2}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        (Only approved users can view, post and comment to this
                        community)
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter bg="gray.100" borderRadius="0 0 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunity;
