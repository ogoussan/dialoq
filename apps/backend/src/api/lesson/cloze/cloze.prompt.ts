import {
  Language,
  Lesson,
  LessonPromptParams,
  PromptTemplate,
  Subtopic,
  TaskType,
  Topic,
} from '@dialoq/types';
import ClozePromptBuilder from './cloze-prompt-builder';

interface PromptOutputEntry {
  sentence: string;
  answer: string;
  translation: string;
}

const additionalInstructions: {
  [key in Subtopic]?: string;
} = {
  présentVerbs:
    'If it is not clear which person and number a pronoun has provide additional information in brackets' +
    'Example: Sie (3rd person plural) [backen] {backen} einen Kuchen für den Geburtstag',
  presentTenseVerbs:
    'If it is not clear which person and number a pronoun has provide additional information in brackets' +
    'Example: Sie (3rd person plural) [backen] {backen} einen Kuchen für den Geburtstag',
  passéComposéVerbs:
    'If the sentences are in french the avoir or être part should be included inside the square brackets' +
    'Example: Ils [ont adopté] {adopter} un oiseau.',
};

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
      sentence:
        '[Mein] {1st person singular} Pass liegt sicher in [ihrer] {3rd person singular feminine} Tasche',
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

    builder.setup(
      taskCount,
      subtopic,
      theme,
      language,
      additionalInstructions[subtopic]
    );

    if (context) {
      builder.addContexts(context.content, context.example);
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
        example: {
          sentence: '[Mein] Computer steht auf [ihren] Tisch',
          propValue: 'Mein,ihren',
          language: Language.German,
        },
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
