import { authModalState } from '@/src/atoms/authModalAtom';
import { useDisclosure, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuhButtons from './OAuthButtons';

const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);

    const handleClose = () =>{
        setModalState((prev) => ({
            ...prev,
            open: false,
        }));
    }
    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center'>
                        {modalState.view==='login' && 'Login'}
                        {modalState.view==='signup' &&'Sign Up'}
                        {modalState.view==='resetPassword' && 'Reset Password'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex" 
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        >
                            <Flex direction='column' align='center' justify-content='center' width='70%' pb={6}>
                                <OAuhButtons />
                                <Text color="gray.500" fontWeight={700}>OR</Text>
                                <AuthInputs />
                            </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default AuthModal;