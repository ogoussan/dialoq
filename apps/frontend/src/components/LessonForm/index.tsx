import { ReactElement, useEffect, useState } from 'react';
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Lesson, Topic } from '@dialoq/types';
import SelectInput from '../Inputs/SelectInput';
import { camelCaseToTitleCase, getSubTopics } from '@dialoq/utils';

interface Props {
  lessonData: Partial<Lesson>;
  onChange: (key: keyof Lesson, value: unknown) => void;
}

const LessonForm = ({ lessonData, onChange }: Props): ReactElement => {
  const [onlyVocabulary, setOnlyVocabulary] = useState(false);

  useEffect(() => {
    if (onlyVocabulary) {
      onChange('topic', 'themeSpecificWords');
      onChange('subtopic', 'themeSpecificWords');
    }
  }, [onChange, onlyVocabulary]);

  return (
    <VStack gap="4" alignItems="flex-start">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={lessonData.name}
          onChange={(event) => onChange('name', event.target.value)}
          width={'full'}
        />
      </FormControl>

      <Heading marginTop={4} size="md">
        What would you like to practice?
      </Heading>
      <FormControl isRequired>
        <FormLabel>Topic</FormLabel>
        <Text fontSize={12}>e.g. Work, Travel, Hobbies...</Text>
        <Input
          value={lessonData.theme}
          onChange={(event) => onChange('theme', event.target.value)}
        />
      </FormControl>
      <HStack width="full">
        <Box
          cursor="pointer"
          borderColor={onlyVocabulary ? 'primary.200' : undefined}
          borderWidth="4px"
          p={4}
          rounded="md"
          w="50%"
          onClick={() => setOnlyVocabulary(true)}
        >
          <Center>Just learn new words</Center>
        </Box>
        <Box
          cursor="pointer"
          borderColor={!onlyVocabulary ? 'primary.200' : undefined}
          borderWidth="4px"
          p={4}
          rounded="md"
          w="50%"
          onClick={() => setOnlyVocabulary(false)}
        >
          <Center>Grammar concept & new words</Center>
        </Box>
      </HStack>
      {!onlyVocabulary && (
        <SelectInput
          label="Grammar topic"
          isRequired
          options={Object.values(Topic)}
          value={lessonData.topic as string}
          onChange={(value) => onChange('topic', value)}
          getOptionLabel={(option) => camelCaseToTitleCase(option, true)}
        />
      )}
      {!onlyVocabulary &&
        lessonData.language &&
        lessonData.topic &&
        !(lessonData.topic === 'themeSpecificWords') && (
          <SelectInput
            label="Grammar subtopic"
            isRequired
            options={getSubTopics(lessonData.language, lessonData.topic)}
            value={lessonData.subtopic as string}
            onChange={(value) => onChange('subtopic', value)}
            getOptionLabel={(option) => camelCaseToTitleCase(option, true)}
          />
        )}
    </VStack>
  );
};

export default LessonForm;
