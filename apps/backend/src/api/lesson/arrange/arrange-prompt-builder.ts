import PromptBuilder from '../prompt-builder';
import { Subtopic } from '@dialoq/types';

class ArrangePromptBuilder extends PromptBuilder {
  public setup(
    taskCount: number,
    subtopic: Subtopic,
    theme: string,
    language: string
  ): ArrangePromptBuilder {
    this._promptString += `
      Give me ${taskCount} short ${language} sentences around the theme ${theme}.
      The sentences should also contain ${subtopic}.
      Do not include the full stop at the end of the sentence.
      Every sentence should be provided with a translation.
      The sentences should be short with an optimal length of 5 words.
    `;

    return this;
  }
}

export default ArrangePromptBuilder;
