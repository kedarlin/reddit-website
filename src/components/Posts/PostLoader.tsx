import { Box, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

type PostLoaderProps = {};

const PostLoader: React.FC<PostLoaderProps> = () => {
  return (
    <Stack spacing={6}>
      <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
        <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4"/>
        <SkeletonText mt="4" noOfLines={4} spacing="4"/>
      </Box>
      <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
        <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4"/>
        <SkeletonText mt="4" noOfLines={4} spacing="4"/>
      </Box>
    </Stack>
  );
};
export default PostLoader;
