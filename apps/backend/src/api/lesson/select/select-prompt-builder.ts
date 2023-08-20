import PromptBuilder from '../prompt-builder';
import { Subtopic } from '@dialoq/types';

class SelectPromptBuilder extends PromptBuilder {
  public setup(
    taskCount: number,
    subtopic: Subtopic,
    theme: string,
    language: string
  ): SelectPromptBuilder {
    this._promptString += `
      Give me ${taskCount} questions regarding ${language} vocabulary where I have to choose the correct translation among 4 options.
      The vocabulary should be around the theme ${theme}.
      The 3 incorrect options should be words of the theme ${theme}, but should not have a similar meaning as the correct option like for example T-Shirt and Shirt.
    `;

    return this;
  }
}

export default SelectPromptBuilder;
