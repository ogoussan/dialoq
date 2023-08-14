import { ReactElement, useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer';
import LessonForm from '../LessonForm';
import { Language, Lesson, RequestBody } from '@dialoq/types';
import { useAuthUser } from '../../services/user.service';
import { useAddLesson } from '../../services/lesson.service';
import { HStack, Progress, Show, Text } from '@chakra-ui/react';
import DrawerContainer from '../DrawerContainer';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const LessonOverlay = ({ isOpen, onClose, language }: Props): ReactElement => {
  const { data: user } = useAuthUser();
  const [lessonData, setLessonData] = useState<Partial<Lesson>>({
    name: '',
    theme: '',
    language,
  });
  const { mutate: addLesson, isLoading } = useAddLesson();

  useEffect(() => {
    if (user?.id) {
      setLessonData((prevState) => ({ ...prevState, userId: user.id }));
    }
  }, [user]);

  const isLessonValid = (): boolean => {
    return (
      !!lessonData.language &&
      !!lessonData.userId &&
      !!lessonData.subtopic &&
      !!lessonData.theme
    );
  };

  const handleChange = (key: keyof Lesson, value: unknown): void => {
    setLessonData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = (): void => {
    if (isLessonValid()) {
      addLesson(lessonData as RequestBody<Lesson>, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <Show above="md">
        <ModalContainer
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          title="Add new Lesson"
          confirmText="Add"
          isLoading={isLoading}
        >
          {isLoading ? (
            <>
              <Text>Generating new lesson. This may take a while...</Text>
              <Progress size="xs" isIndeterminate />
            </>
          ) : (
            <LessonForm lessonData={lessonData} onChange={handleChange} />
          )}
        </ModalContainer>
      </Show>

      <Show breakpoint="sm">
        <DrawerContainer
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          title="Add new Lesson"
          confirmText="Add"
          isLoading={isLoading}
        >
          {isLoading ? (
            <HStack>
              <Text>Generating new lesson. This may take a while...</Text>
              <Progress size="md" isIndeterminate />
            </HStack>
          ) : (
            <LessonForm lessonData={lessonData} onChange={handleChange} />
          )}
        </DrawerContainer>
      </Show>
    </>
  );
};

export default LessonOverlay;
