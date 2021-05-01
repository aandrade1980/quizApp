import React from 'react';
import { Box, Divider, Flex, Heading, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';

const newQuizRoute = '/quiz/new';
const signInRoute = '/signin';

const Navbar: React.FC<{}> = () => {
  const { auth, signOut } = useAuth();
  const router = useRouter();

  return (
    <>
      <Flex justify="space-between" m={4}>
        <Heading onClick={() => router.push('/')} as="button">
          QuizApp
        </Heading>
        <Box>
          {auth ? (
            <Box p={2}>
              <Link
                p={2}
                onClick={() => router.push(newQuizRoute)}
                fontWeight={
                  router.pathname === newQuizRoute ? 'extrabold' : 'normal'
                }
              >
                Add new quiz
              </Link>
              <Link p={2} onClick={() => signOut()}>
                Logout
              </Link>
            </Box>
          ) : (
            <Box p={2}>
              <Link
                p={2}
                onClick={() => router.push(signInRoute)}
                fontWeight={
                  router.pathname === signInRoute ? 'extrabold' : 'normal'
                }
              >
                Sign In
              </Link>
            </Box>
          )}
        </Box>
      </Flex>
      <Divider css={{ boxShadow: '1px 1px #88888' }} />
    </>
  );
};

export default Navbar;
