import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';

const OAuthButtons:React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return (
        <Flex flexDirection="column">
            <Button 
                variant="oauth" 
                mb={4} 
                isLoading={loading} 
                onClick={() => signInWithGoogle()}
            >
                <Image src="/images/googlelogo.png" height="20px" mr={2} alt='google-logo'/>
                Continue With Google</Button>
            <Button variant="oauth" mb={4}>Some Other Provider</Button>
            {error && <Text color="red" textAlign="center">
                        {error.message}
                    </Text>
            }
        </Flex>
    );
}
export default OAuthButtons;