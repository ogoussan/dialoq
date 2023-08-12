import React, { ReactElement } from 'react';
import { TaskType, Subtopic } from '@dialoq/types';
import { Box, Heading } from '@chakra-ui/react';

interface TaskDescriptionProps {
  taskType: TaskType;
  lessonSubtopic: Subtopic;
}

const TaskDescription = ({
  taskType,
  lessonSubtopic,
}: TaskDescriptionProps): ReactElement => {
  const descriptionMap = {
    [TaskType.Cloze]: `Please fill in the gaps with the correct ${lessonSubtopic}.`,
    [TaskType.Select]: `Select the correct meaning of this word`,
    [TaskType.Arrange]: `Please arrange the sentence in the correct order`,
  };

  return (
    <Box paddingY="4" whiteSpace="pre-wrap" width="100%">
      <Heading size="md">{descriptionMap[taskType]}</Heading>
    </Box>
  );
};

export default TaskDescription;
