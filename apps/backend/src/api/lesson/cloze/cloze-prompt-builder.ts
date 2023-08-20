import { Language, Subtopic } from '@dialoq/types';
import PromptBuilder from '../prompt-builder';

class ClozePromptBuilder extends PromptBuilder {
  public setup(
    taskCount: number,
    subtopic: Subtopic,
    theme: string,
    language: string,
    extraInstruction?: string
  ): ClozePromptBuilder {
    this._promptString += `
    Give me ${taskCount} ${subtopic}.
    ${extraInstruction || ''}.
      Then surround every one of the ${subtopic} with square brackets and form a sentence with each.
      The sentence should have the theme ${theme} and be in ${language}.
      The square brackets should include the entire ${subtopic}.
      Each sentence should ONLY contain one pair of square brackets and be SHORT.
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
