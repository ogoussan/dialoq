import { Button, Card, useDisclosure, VStack } from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react';
import SelectInput from '../components/Inputs/SelectInput';
import { Language, Lesson } from '@dialoq/types';
import LessonsWidget from '../components/LessonsWidget';
import { useLessons } from '../services/lesson.service';
import LessonOverlay from '../components/LessonOverlay';
import { ToUpperCase } from '@dialoq/utils';

const HomePage = (): ReactElement => {
  const { data: lessons = [], isLoading } = useLessons();
  const [language, setLanguage] = useState(Language.German);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [lessonsForCurrentLanguage, setLessonsForCurrentLanguage] = useState<
    Lesson[]
  >([]);

  useEffect(() => {
    const sortedLessons = lessons
      .filter((lesson) => language === lesson.language)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    setLessonsForCurrentLanguage(sortedLessons);
  }, [language, lessons]);

  return (
    <Card width={['90%', '80%', '80%']} p={[6, 8, 8]}>
      <VStack rowGap="32px">
        <SelectInput
          options={Object.values(Language)}
          value={language}
          label="Select your language"
          onChange={(newLanguage) => setLanguage(newLanguage as Language)}
          getOptionLabel={(option) => ToUpperCase(option)}
        />
        <Button width="full" onClick={onOpen}>
          Add new Lesson
        </Button>
        <LessonsWidget
          title="Your Lessons"
          lessons={lessonsForCurrentLanguage}
          isLoading={isLoading}
        />
      </VStack>
      <LessonOverlay isOpen={isOpen} onClose={onClose} language={language} />
    </Card>
  );
};

export default HomePage;
