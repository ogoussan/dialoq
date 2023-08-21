import { Language, Subtopic } from '@dialoq/types';
import PromptBuilder from '../prompt-builder';
import { camelCaseToTitleCase } from '@dialoq/utils';

class ClozePromptBuilder extends PromptBuilder {
  public setup(
    taskCount: number,
    subtopic: Subtopic,
    theme: string,
    language: string,
    extraInstruction?: string
  ): ClozePromptBuilder {
    this._promptString += `
    Here is some background information about the use case of below instructions:
    I want to practice ${camelCaseToTitleCase(subtopic)} in my app
    The square brackets will represent gaps that need to be filled by the user
    and the curly brackets will be info about the ${camelCaseToTitleCase(
      subtopic
    )} which the user needs to solve the task.
    ---
    Instructions:
    Give me ${taskCount} ${camelCaseToTitleCase(subtopic)}.
    ${extraInstruction || ''}.
      Then surround every one of the ${camelCaseToTitleCase(
        subtopic
      )} with square brackets and form a sentence with each.
      The sentence should have the theme ${theme} and be in ${language}.
      The square brackets should include the entire ${camelCaseToTitleCase(
        subtopic
      )} and ONLY the ${camelCaseToTitleCase(
      subtopic
    )}, no word of a different type than ${camelCaseToTitleCase(
      subtopic
    )} should be in square brackets!!!
      Each sentence should ONLY contain one pair of square brackets and be SHORT, with an optimal sentence length of 6 words.
      The provided translation should NOT contain any kinds of brackets.
      NEVER surround a word that is not ${camelCaseToTitleCase(
        subtopic
      )} in brackets.
      The translation has to be grammatically correct.
    `;

    return this;
  }

  public addContexts(
    context: string,
    example?: {
      sentence: string;
      language: Language;
    }
  ): ClozePromptBuilder {
    this._promptString += `
      Every pair of square brackets should be followed by curly brackets containing ${context}.
      If the curly brackets are not needed for the user guess the correct content of the square brackets
      they should be left out. This is for Example the case for reflexiv pronouns.
      These curly brackets and their content should not be included in the translation.
    `;

    if (example) {
      this._promptString += `
      Example for ${example.language}: ${example.sentence}
    `;
    }

    return this;
  }
}

export default ClozePromptBuilder;
