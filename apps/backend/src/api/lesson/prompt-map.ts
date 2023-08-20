import { Lesson, PromptTemplate, TaskType } from '@dialoq/types';
import { clozePrompt } from './cloze/cloze.prompt';
import { selectPrompt } from './select/select.prompt';
import { arrangePrompt } from './arrange/arrange.prompt';

export const promptMap: { [key in TaskType]: PromptTemplate<Lesson> } = {
  [TaskType.Cloze]: clozePrompt,
  [TaskType.Select]: selectPrompt,
  [TaskType.Arrange]: arrangePrompt,
};
