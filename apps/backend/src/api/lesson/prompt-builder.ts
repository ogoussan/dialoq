import { Language } from '@dialoq/types';

class PromptBuilder {
  protected _promptString: string;

  public constructor() {
    this._promptString = '';
  }

  public get promptString(): string {
    return this._promptString;
  }

  public specifyOutputJson(
    outputProps: {
      name: string;
      type: string;
      comment?: string;
      example?: { sentence: string; propValue: string; language: Language };
    }[]
  ): PromptBuilder {
    this._promptString += `
      The output should be in JSON
      Use following object model for JSON:
      data: [
        {
          ${outputProps.map(
            ({ name, type, comment }) => `
              ${name}: ${type} /* ${comment} */
            `
          )}
        }
        ...
      ]
    `;

    return this;
  }

  public provideExample(example: string, language: string): PromptBuilder {
    this._promptString += `
      Example for ${language}: ${example}.
    `;

    return this;
  }
}

export default PromptBuilder;
