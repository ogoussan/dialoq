import { Lesson } from '@dialoq/types';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  VStack,
  Progress,
  HStack,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { LessonCardMenu } from './LessonCardMenu';
import { camelCaseToTitleCase } from '@dialoq/utils';

const LessonCard = ({ lesson }: { lesson: Lesson }): ReactElement => {
  const navigate = useNavigate();

  const getCompletedPercentage = (): number => {
    if (!lesson.tasks) {
      return 0;
    }

    const completedCount = lesson.tasks.reduce(
      (prev, task) => (task.isCompleted ? prev + 1 : prev),
      0
    );

    return (completedCount / lesson.tasks.length) * 100;
  };

  return (
    <Card
      backgroundColor="gray.300"
      _dark={{
        backgroundColor: 'gray.800',
      }}
      width={'full'}
    >
      <CardHeader>
        <HStack width={'full'} justifyContent={'space-between'}>
          <Heading title={lesson.name} size={['sm', 'md', 'md']} noOfLines={1}>
            {lesson.name}
          </Heading>
          <LessonCardMenu lesson={lesson} />
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack alignItems="flex-start" gap={4}>
          <Box width="full">
            <Progress
              borderRadius={'md'}
              value={getCompletedPercentage()}
              isAnimated={true}
              sx={{
                '& > div:first-child': {
                  transitionProperty: 'width',
                },
              }}
            />
          </Box>
          <Box>
            <Text>Theme: </Text>
            <Badge>{lesson.theme}</Badge>
          </Box>
          <Box>
            <Text>Grammar concept: </Text>
            <Badge>{camelCaseToTitleCase(lesson.subtopic)}</Badge>
          </Box>
        </VStack>
      </CardBody>
      <CardFooter justifyContent="flex-end">
        <Button onClick={() => navigate(`/app/lesson/${lesson.id}`)}>
          Go to Lesson
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
