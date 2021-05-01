import {
  Box,
  Center,
  Container,
  Divider,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { NextPageContext } from 'next';
import React from 'react';
import NavBar from '@/common/Navbar';
import { getAnswer, getSingleQuiz } from '@/utils/db';

interface IAnswerProps {
  quiz: string;
  answer: string;
}

const answer = (props: IAnswerProps) => {
  const quiz = JSON.parse(props.quiz);
  const answer = JSON.parse(props.answer);

  return (
    <>
      <NavBar />
      {quiz && answer && (
        <Container maxW="3x1" mt={5}>
          <Center flexDirection="column">
            <Heading>Correct Answer for {quiz.title}</Heading>
            <Text mt={4}>{quiz.description}</Text>
          </Center>
          <Divider my={4} css={{ boxShadow: '1px 1px #888888' }} />
          {quiz.questions.map((singleQuiz, index) => (
            <Box
              mt={index !== 0 && 4}
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={6}
              boxShadow="xl"
              backgroundColor={
                answer.questions[singleQuiz.questionId] &&
                singleQuiz.options[singleQuiz.answer].optionId ===
                  answer.questions[singleQuiz.questionId]
                  ? 'green.200'
                  : 'red.200'
              }
            >
              <Text>
                {index + 1} {singleQuiz.title}
              </Text>
              <RadioGroup>
                <SimpleGrid minChildWidth="120px" mt={2}>
                  {singleQuiz.options.map((option, index) => (
                    <Radio value={option.title} isDisabled key={index}>
                      {option.title}
                    </Radio>
                  ))}
                </SimpleGrid>
              </RadioGroup>
              <Text mt={3}>
                Correct Answer: {singleQuiz.options[singleQuiz.answer].title}
              </Text>
              {answer.questions[singleQuiz.questionId] ? (
                <Text>
                  Selected Answer:{' '}
                  {
                    singleQuiz.options.find(
                      option =>
                        option.optionId ===
                        answer.questions[singleQuiz.questionId]
                    ).title
                  }
                </Text>
              ) : (
                <Text>Not Answered</Text>
              )}
            </Box>
          ))}
        </Container>
      )}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id, answerId } = context.query;
  const quiz = await getSingleQuiz(id);
  const answer = await getAnswer(answerId);

  return {
    props: {
      answer,
      quiz,
    },
  };
}

export default answer;
