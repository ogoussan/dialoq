import {
  Lesson,
  LessonPromptParams,
  PromptTemplate,
  TaskType,
} from '@dialoq/types';
import ArrangePromptBuilder from './arrange-prompt-builder';

interface PromptOutputEntry {
  sentence: string;
  translation: string;
}
export const arrangePrompt = {
  id: 'arrange-sentence',
  render: ({ language, taskCount, theme, subtopic }: LessonPromptParams) => {
    const builder = new ArrangePromptBuilder();

    builder.setup(taskCount, subtopic, theme, language);

    builder.specifyOutputJson([
      {
        name: 'sentence',
        type: 'string',
      },
      {
        name: 'translation',
        type: 'string',
      },
    ]);

    return builder.promptString;
  },
  parse: (promptOutput: string, lessonId: string) => {
    const parsedOutput: PromptOutputEntry[] =
      JSON.parse(promptOutput).data || [];

    return parsedOutput.map((item) => ({
      lessonId,
      type: TaskType.Arrange,
      question: item.sentence,
      answer: item.sentence,
      translation: item.translation,
    }));
  },
} satisfies PromptTemplate<Lesson>;
