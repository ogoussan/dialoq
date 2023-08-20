import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Card, HStack, Input, Text } from '@chakra-ui/react';

import TaskQuestionTranslation from './TaskQuestionTranslation';

const ClozeTestTask = ({
  question,
  translation,
  onInputValuesChange,
}: Props): ReactElement => {
  const regex = useMemo(() => /\[.*?]/, []);
  const descriptionTokens = useMemo(
    () => question.match(/\{.*?}/g) || [],
    [question]
  );
  const tokens = useMemo(
    () => question.replace(/\{.*?}/g, '').match(/\[.*?\]|[\w\p{L}]+/gu) || [],
    [question]
  );

  const [inputValues, setInputValues] = useState<string[]>(
    tokens.filter((token) => regex.test(token)).map(() => '')
  );

  // reset when question changes
  useEffect(() => {
    setInputValues(tokens.filter((token) => regex.test(token)).map(() => ''));
  }, [question, regex, tokens]);

  useEffect(() => {
    setInputValues(tokens.filter((token) => regex.test(token)).map(() => ''));
  }, [regex, tokens]);

  useEffect(() => {
    onInputValuesChange(
      inputValues.filter((value) => !!value.trim()).join(',')
    );
  }, [inputValues, onInputValuesChange]);

  const handleChange = (index: number, newValue: string): void => {
    setInputValues(
      inputValues.map((currentValue, i) =>
        index === i ? newValue : currentValue
      )
    );
  };

  return (
    <HStack flexWrap="wrap" alignItems="flex-start" width="full">
      <TaskQuestionTranslation translation={translation} />
      <Card
        backgroundColor="gray.300"
        _dark={{
          backgroundColor: 'gray.800',
        }}
        padding="4"
        whiteSpace="pre-wrap"
        width="full"
      >
        <HStack flexWrap="wrap" gap="6px">
          {tokens.map((token, index) => {
            if (token.match(regex)) {
              const inputIndex = tokens
                .filter((token) => regex.test(token))
                .findIndex((t) => t === token);

              return (
                <Input
                  isRequired
                  key={index}
                  type="text"
                  value={inputValues[inputIndex] || ''}
                  variant="filled"
                  bg="gray.100"
                  fontWeight="bold"
                  fontSize="18px"
                  _dark={{
                    backgroundColor: 'gray.700',
                  }}
                  _hover={{
                    filter: 'brightness(0.8)',
                  }}
                  onChange={(e) => handleChange(inputIndex, e.target.value)}
                  size="sm"
                  borderRadius="4px"
                  width={`${
                    Math.max(
                      token.length,
                      inputValues[inputIndex]?.length,
                      descriptionTokens[inputIndex]?.length ?? 0
                    ) * 12
                  }px`} // Roughly set the width based on the word's length
                  lineHeight="normal"
                  _placeholder={{
                    fontSize: '12px',
                    _dark: {
                      color: 'white',
                    },
                  }}
                  placeholder={
                    descriptionTokens[inputIndex] &&
                    descriptionTokens[inputIndex]
                      .replace('{', '')
                      .replace('}', '')
                  }
                />
              );
            } else {
              return <Text key={index}>{token}</Text>;
            }
          })}
        </HStack>
      </Card>
    </HStack>
  );
};

interface Props {
  question: string;
  translation: string;
  onInputValuesChange: (inputValues: string) => void;
}

export default ClozeTestTask;
