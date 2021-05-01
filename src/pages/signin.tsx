import { Button, Center, Container, Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import Navbar from '@/common/Navbar';
import { useAuth } from '@/lib/auth';
import { useTranslation } from 'react-i18next';

const signIn = () => {
  const { auth, signInWithGoogle } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  if (auth) {
    router.push((router.query.next as string) || '/');
  }

  return (
    <>
      <Navbar />
      <Container>
        <Center mt={10}>
          <VStack spacing="4">
            <Heading fontSize="3xl" mb={2}>
              {t('welcome_message')}
            </Heading>
            <Button leftIcon={<FcGoogle />} onClick={() => signInWithGoogle()}>
              {t('sign_in_with_google')}
            </Button>
          </VStack>
        </Center>
      </Container>
    </>
  );
};

export default signIn;
