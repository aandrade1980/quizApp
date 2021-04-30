import Head from 'next/head';
import {
  Box,
  Container,
  Divider,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { getAllQuiz, getAllUsers } from '@/utils/db';
import Navbar from '@/common/Navbar';

export default function Home({ quiz }) {
  const formattedQuiz = JSON.parse(quiz);
  const router = useRouter();

  const generateQuizCard = singleQuiz => (
    <Box m={3} borderWidth="1px" borderRadius="lg" p={6} boxShadow="xl">
      <Heading as="h3" size="lg">
        {singleQuiz.title}
      </Heading>
      <Text color="gray.500" mt={2}>
        Posted By: {singleQuiz.user.name}
      </Text>
      <Text color="gray.500" mt={2}>
        Number of Questions: {singleQuiz.questions.length}
      </Text>

      <Divider my={3} />

      <Text noOfLines={[1, 2, 3]}>{singleQuiz.description}</Text>
    </Box>
  );

  return (
    <Box>
      <Head>
        <title>QuizApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header>
          <Navbar />
          <Container maxW="6xl">
            {formattedQuiz.length > 0 && (
              <SimpleGrid minChildWidth="400px">
                {formattedQuiz.map(singleQuiz => (
                  <Box
                    key={singleQuiz.id}
                    onClick={() => router.push(`/quiz/${singleQuiz.id}`)}
                    as="button"
                    textAlign="start"
                    m={2}
                  >
                    {generateQuizCard(singleQuiz)}
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Container>
        </header>
      </main>
      <footer>Footer</footer>
    </Box>
  );
}

export async function getServerSideProps(_context) {
  const quiz = await getAllQuiz();
  const users = await getAllUsers();
  const data = quiz.map(singleQuiz => ({
    ...singleQuiz,
    user: users.find(user => user.id === singleQuiz.userId),
  }));

  return { props: { quiz: JSON.stringify(data) } };
}
