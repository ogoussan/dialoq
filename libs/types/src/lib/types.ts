import { Profile } from 'passport-google-oauth20';
import { Task } from './interfaces';
import { GermanArticle, GermanPronoun, GermanTense } from './german.enum';
import { FrenchArticle, FrenchPronoun, FrenchTense } from './french.enum';
import { SpanishArticle, SpanishPronoun, SpanishTense } from './spanish.enum';
import { TaskType } from './enums';

export type GoogleUser = Profile['_json'] & {
  accessToken: string;
  refreshToken: string;
};

export type RequestBody<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;

export type PromptTemplate<T> = {
  id: string;
  render: (params: T) => string;
  parse: (promptOutputString: string, lessonId: string) => Partial<Task>[];
};

export class Prompt<T> {
  public constructor(
    public template: PromptTemplate<T>,
    public params: T,
    public taskCount: number
  ) {}

  public render(): string {
    return this.template.render({ ...this.params, taskCount: this.taskCount });
  }

  public parse(promptOutputString: string, lessonId: string): Partial<Task>[] {
    return this.template.parse(promptOutputString, lessonId);
  }
}

export type Subtopic =
  | GermanArticle
  | GermanPronoun
  | GermanTense
  | FrenchArticle
  | FrenchPronoun
  | FrenchTense
  | SpanishArticle
  | SpanishPronoun
  | SpanishTense;

export type ThemeSpecificWords = 'themeSpecificWords';

export type TaskAllocation = { [key in TaskType]?: number };
export type LessonConfigType = { [key in 'default']: TaskAllocation } & {
  [key in Subtopic]?: TaskAllocation;
};
