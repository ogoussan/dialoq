import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import TaskDescription from './TaskDescription';
import { Button, HStack, useToast } from '@chakra-ui/react';
import { Task, Subtopic } from '@dialoq/types';
import { useUpdateTask } from '../../services/task.service';
import TaskRenderer from './TaskRenderer';
import { env } from '../../env';

interface TaskProps {
  task: Task;
  subtopic: Subtopic;
}

export type TaskState =
  | { type: 'CORRECT'; answer: string }
  | { type: 'UNANSWERED'; answer: string }
  | { type: 'INCORRECT'; answer: string };

const initialTaskState: TaskState = { type: 'UNANSWERED', answer: '' };

const TaskContainer = ({ task, subtopic }: TaskProps): ReactElement => {
  const [taskState, setTaskState] = useState<TaskState>(initialTaskState);
  const { mutate: updateTask } = useUpdateTask(task.id);

  const toast = useToast();

  useEffect(() => {
    setTaskState({
      type: 'UNANSWERED',
      answer: '',
    });
  }, [task]);

  const handleInputValuesChange = useCallback((input: string): void => {
    setTaskState({
      type: 'UNANSWERED',
      answer: input,
    });
  }, []);

  const getFormattedAnswer = (answer: string): string =>
    answer
      .split(',')
      .map((token) => token.trim())
      .join();

  const answerTask = (): void => {
    if (!task) {
      return;
    }

    if (
      getFormattedAnswer(taskState.answer.trim()) ===
      getFormattedAnswer(task.answer.trim())
    ) {
      setTaskState((prevState) => ({
        type: 'CORRECT',
        answer: prevState.answer,
      }));
    } else {
      setTaskState((prevState) => ({
        type: 'INCORRECT',
        answer: prevState.answer,
      }));
    }
  };

  useEffect(() => {
    if (taskState.type === 'CORRECT') {
      toast({
        title: 'Correct answer',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } else if (taskState.type === 'INCORRECT') {
      toast({
        title: 'Wrong answer',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [taskState, toast]);

  const handleContinue = (): void => {
    updateTask({ ...task, isCompleted: taskState.type === 'CORRECT' });
    setTaskState(initialTaskState);
  };

  return (
    <>
      {env.NODE_ENV === 'development' && task.answer}
      <TaskDescription taskType={task.type} lessonSubtopic={subtopic} />
      <TaskRenderer task={task} onChange={handleInputValuesChange} />
      {taskState.type === 'UNANSWERED' && (
        <HStack width="100%" justifyContent="flex-end">
          <Button isDisabled={!taskState.answer} onClick={() => answerTask()}>
            Check answer
          </Button>
        </HStack>
      )}
      {taskState.type === 'CORRECT' && (
        <Button width="full" height="70px" onClick={() => handleContinue()}>
          Continue
        </Button>
      )}
      {taskState.type === 'INCORRECT' && (
        <Button
          colorScheme="gray"
          width="full"
          height="70px"
          onClick={() => handleContinue()}
        >
          Skip
        </Button>
      )}
    </>
  );
};

export default TaskContainer;
