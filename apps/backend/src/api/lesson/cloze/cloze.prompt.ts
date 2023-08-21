import {
  Language,
  Lesson,
  LessonPromptParams,
  PromptTemplate,
  TaskType,
  Topic,
} from '@dialoq/types';
import ClozePromptBuilder from './cloze-prompt-builder';

interface PromptOutputEntry {
  sentence: string;
  answer: string;
  translation: string;
}

const squareBracketContexts: {
  [key in Topic]?: {
    content: string;
    example?: { sentence: string; language: Language };
  };
} = {
  [Topic.Pronoun]: {
    content:
      'person and number (singular of plural) of the pronoun and also the gender of the possessive pronoun if needed.',
    example: {
      sentence: `
         Example for Possessiv Pronouns: [Mein] {1st person singular} Pass liegt sicher in [ihrer] {3rd person singular feminine} Tasche`,
      language: Language.German,
    },
  },
  [Topic.Tense]: {
    content: 'infinitive of the tense verb',
    example: {
      sentence: 'Ich [schreibe] {schreiben} morgen eine Prüfung in Mathe.',
      language: Language.German,
    },
  },
};

const sentenceExamples: {
  [key in Topic]?: string;
} = {
  [Topic.Pronoun]: `
    Example for Possessive Pronouns in German: [Mein] {1st person singular} Pass liegt sicher in [ihrer] {3rd person singular feminine} Tasche
    Example for Reflexive Pronouns in German: Er hat [sich] für sein Verhalten gestern entschuldigt.
    Example for Interrogative Pronouns in German: Wessen Jacke befindet sich auf dem Boden?`,
  [Topic.Tense]:
    'Example for Present Tense in German: Ich [lege] {legen} mich bald schlafen.',
};

export const clozePrompt = {
  id: 'cloze-test',
  render: ({
    language,
    topic,
    subtopic,
    theme,
    taskCount,
  }: LessonPromptParams) => {
    const builder = new ClozePromptBuilder();
    const context = squareBracketContexts[topic];
    const example = sentenceExamples[topic];

    builder.setup(taskCount, subtopic, theme, language);

    if (context) {
      builder.addContexts(context.content, context.example);
    }

    if (example) {
      builder.provideExample(example, Language.German);
    }

    builder.specifyOutputJson([
      {
        name: 'sentence',
        type: 'string',
      },
      {
        name: 'translation',
        type: 'string',
      },
      {
        name: 'answer',
        type: 'string',
        comment:
          'Content of all square brackets (without the brackets) in correct order and separated by comma without white space.',
      },
    ]);

    return builder.promptString;
  },
  parse: (promptOutput: string, lessonId: string) => {
    const parsedOutput: PromptOutputEntry[] =
      JSON.parse(promptOutput).data || [];

    return parsedOutput.map((item) => ({
      lessonId,
      type: TaskType.Cloze,
      question: item.sentence,
      answer: item.answer,
      translation: item.translation,
    }));
  },
} satisfies PromptTemplate<Lesson>;
