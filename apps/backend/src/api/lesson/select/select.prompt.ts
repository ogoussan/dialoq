import {
  Lesson,
  LessonPromptParams,
  PromptTemplate,
  TaskType,
} from '@dialoq/types';
import SelectPromptBuilder from './select-prompt-builder';

interface PromptOutputEntry {
  vocabulary: string;
  options: string;
  correctAnswer: string;
}

export const selectPrompt = {
  id: 'select-test',
  render: ({ subtopic, language, taskCount, theme }: LessonPromptParams) => {
    const builder = new SelectPromptBuilder();

    builder.setup(taskCount, subtopic, theme, language);
    builder.specifyOutputJson([
      {
        name: 'vocabulary',
        type: 'string',
        comment:
          'English translation of the correct option. If the correct option is "Apfel" the value should be "Apfel"',
      },
      {
        name: 'options',
        type: 'string',
        comment:
          'contains all 4 options of which one is the correctAnswer.' +
          'They are separated by comma without whitespace like this: "Apfel,Hund,Tasche,Ball."',
      },
      {
        name: 'correctAnswer',
        type: 'string',
        comment: 'contains the correct option',
      },
    ]);

    return builder.promptString;
  },
  parse: (promptOutputString: string, lessonId: string) => {
    const parsedOutput: PromptOutputEntry[] =
      JSON.parse(promptOutputString).data || [];

    return parsedOutput.map((entry) => ({
      lessonId,
      type: TaskType.Select,
      question: entry.vocabulary,
      answer: entry.correctAnswer,
      options: entry.options,
      translation: '',
    }));
  },
} satisfies PromptTemplate<Lesson>;
