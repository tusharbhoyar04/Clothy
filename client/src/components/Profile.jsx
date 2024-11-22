import React from 'react';
import { Avatar, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Flex, Button, } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userDataString = localStorage.getItem("User");
    const userData = JSON.parse(userDataString) || {};
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("User");
        onClose();
        navigate("/")
        window.location.reload(true);
    };

    return (
        <>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    borderRadius="md"
                    boxShadow="lg"
                    mx={{ base: 4, md: 4 }}
                    maxW={{ base: '55%', md: '35%' }}
                    p={"3"}
                >
                    <ModalHeader
                        borderBottomWidth="1px"
                        p={{ base: 2, md: 4 }}
                        textAlign="center"
                        fontSize="xl"
                        fontWeight="bold"
                    >
                        Profile
                    </ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody >
                        <Flex direction="column" align="center">
                            <Avatar size='lg' name={userData.avatar} src={userData.avatar} mb={4} />
                            <Text fontWeight='bold' mb='1rem' textAlign="center">
                                URL: {userData.avatar}
                            </Text>
                            <Text fontWeight='bold' mb='1rem' textAlign="center">
                                Name: {userData.fullname}
                            </Text>
                            <Text fontWeight='bold' mb='1rem' textAlign="center">
                                Email: {userData.email}
                            </Text>
                            <Button colorScheme="red" onClick={handleLogout} mt={4}>Logout</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Avatar size='sm' onClick={onOpen} cursor='pointer' />
        </>
    );
};

export default Profile;
