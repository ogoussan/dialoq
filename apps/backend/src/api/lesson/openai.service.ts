import { Prompt } from '@dialoq/types';
import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { Logger } from '@nestjs/common';
import { env } from '../../env';

@Injectable()
export class OpenAiService {
  private openai: OpenAIApi;

  private defaultOptions = { model: 'gpt-3.5-turbo', temperature: 0.7 };
  private logger = new Logger('OpenAiService');

  public constructor() {
    const configuration = new Configuration({
      apiKey: env.OPENAI_API_KEY,
      organization: env.OPENAI_ORG_ID,
    });

    this.openai = new OpenAIApi(configuration);
  }

  public createChatCompletion = async <T>(prompt: Prompt<T>): Promise<any> => {
    const response = await this.openai.createChatCompletion({
      ...this.defaultOptions,
      messages: [{ role: 'user' as const, content: prompt.render() }],
    });

    const result = response.data.choices[0];

    this.logger.log('created open ai chat completion', {
      openai: {
        model: response.data.model,
        prompt: {
          id: prompt.template.id,
          params: prompt.params,
          text: prompt.render(),
        },
        result: {
          text: result?.message?.content,
          finish_reason: result?.finish_reason,
        },
        tokens: response.data.usage,
        status: response.status,
      },
    });

    return result?.message?.content;
  };
}
