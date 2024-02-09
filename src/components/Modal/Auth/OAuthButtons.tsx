import { Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';

const OAuthButtons:React.FC = () => {
    
    return (
        <Flex flexDirection="column">
            <Button variant="oauth" mb={4}>
                <Image src="/images/googlelogo.png" height="20px" mr={2}/>
                Continue With Google</Button>
            <Button variant="oauth" mb={4}>Some Other Provider</Button>
        </Flex>
    );
}
export default OAuthButtons;