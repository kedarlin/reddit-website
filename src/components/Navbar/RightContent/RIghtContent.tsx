import { Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal';

type RIghtContentProps = {
    // user: any;
};

const RIghtContent:React.FC<RIghtContentProps> = () => {
    
    return(
        <>
        <AuthModal />
            <Flex justify='center' align='center' >
                <AuthButtons />
            </Flex>
        </>
    )
}
export default RIghtContent;