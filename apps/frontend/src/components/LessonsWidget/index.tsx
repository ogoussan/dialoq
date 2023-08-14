import { ReactElement } from 'react';
import {
  VStack,
  Text,
  Grid,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react';
import LessonCard from './LessonCard';
import { Lesson } from '@dialoq/types';

interface Props {
  title: string;
  lessons: Lesson[];
  isLoading?: boolean;
}

const LessonsWidget = ({ title, lessons, isLoading }: Props): ReactElement => {
  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    sm: 'repeat(1, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
    xl: 'repeat(5, 1fr)',
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <VStack width="full" overflowX="scroll" alignItems="flex-start">
      <Text fontSize={['lg', 'xl', '2xl']}>{title}</Text>
      <Grid gap="8px" templateColumns={gridTemplateColumns} width={'full'}>
        {lessons.length ? (
          lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))
        ) : (
          <Text
            fontSize={14}
            _light={{
              color: 'gray.600',
            }}
          >
            No lessons yet
          </Text>
        )}
      </Grid>
    </VStack>
  );
};

export default LessonsWidget;
