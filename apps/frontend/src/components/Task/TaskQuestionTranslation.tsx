import React, { ReactElement } from 'react';
import { Card, HStack, Text } from '@chakra-ui/react';

interface TaskQuestionTranslationProps {
  translation: string;
  highlightModelAnswer?: boolean;
}

const TaskQuestionTranslation = ({
  translation,
  highlightModelAnswer = false,
}: TaskQuestionTranslationProps): ReactElement => {
  const regex = /\[.*?]/;
  const tokens = translation.split(/\s+/);

  return (
    <Card
      padding="4"
      backgroundColor="gray.200"
      _dark={{
        backgroundColor: 'gray.800',
      }}
      width="100%"
    >
      <HStack flexWrap="wrap">
        {tokens.map((token, index) => (
          <React.Fragment key={index}>
            {regex.test(token) ? (
              <Text
                as="span"
                textDecor={highlightModelAnswer ? 'underline' : ''}
              >
                {token.replace('[', ' ').replace(']', ' ')}
              </Text>
            ) : (
              <Text>{` ${token}`}</Text>
            )}
          </React.Fragment>
        ))}
      </HStack>
    </Card>
  );
};

export default TaskQuestionTranslation;
