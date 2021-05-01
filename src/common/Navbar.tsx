import React from 'react';
import { Box, Button, Divider, Flex, Heading, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import { useTranslation } from 'react-i18next';

const newQuizRoute = '/quiz/new';
const signInRoute = '/signin';

const ChangeLanguage = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (language: string) => i18n.changeLanguage(language);

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        mr={1}
        onClick={() => changeLanguage('es')}
      >
        Es
      </Button>
      <Button size="sm" variant="outline" onClick={() => changeLanguage('en')}>
        En
      </Button>
    </>
  );
};

const Navbar: React.FC<{}> = () => {
  const { auth, signOut } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

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
                {t('add_new_quiz')}
              </Link>
              <Link p={2} onClick={() => signOut()}>
                {t('logout')}
              </Link>
              <ChangeLanguage />
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
                {t('sign_in')}
              </Link>
              <ChangeLanguage />
            </Box>
          )}
        </Box>
      </Flex>
      <Divider css={{ boxShadow: '1px 1px #88888' }} />
    </>
  );
};

export default Navbar;
