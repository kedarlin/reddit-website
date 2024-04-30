import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../../firebase/clientApp';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const OAuthButtons:React.FC = () => {
    const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);
    const createUserDocument = async(user: User) => {
        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    }
    useEffect(() =>{
        if(userCred){
          createUserDocument(userCred.user);
        }
    }, [userCred]);

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