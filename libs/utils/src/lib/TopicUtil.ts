import { Language, Subtopic, Topic } from '@dialoq/types';
import { GermanArticle, GermanPronoun, GermanTense } from '@dialoq/types';
import { FrenchArticle, FrenchPronoun, FrenchTense } from '@dialoq/types';
import { SpanishArticle, SpanishPronoun, SpanishTense } from '@dialoq/types';

export const getSubTopics = (language: Language, topic: Topic): Subtopic[] => {
  switch (language) {
    case Language.German:
      return getGermanSubTopics(topic);
    case Language.French:
      return getFrenchSubTopics(topic);
    case Language.Spanish:
      return getSpanishSubTopics(topic);
  }
};

const getGermanSubTopics = (topic: Topic): Subtopic[] => {
  switch (topic) {
    case Topic.Article:
      return Object.values(GermanArticle);
    case Topic.Pronoun:
      return Object.values(GermanPronoun);
    case Topic.Tense:
      return Object.values(GermanTense);
  }
};

const getFrenchSubTopics = (topic: Topic): Subtopic[] => {
  switch (topic) {
    case Topic.Article:
      return Object.values(FrenchArticle);
    case Topic.Pronoun:
      return Object.values(FrenchPronoun);
    case Topic.Tense:
      return Object.values(FrenchTense);
  }
};

const getSpanishSubTopics = (topic: Topic): Subtopic[] => {
  switch (topic) {
    case Topic.Article:
      return Object.values(SpanishArticle);
    case Topic.Pronoun:
      return Object.values(SpanishPronoun);
    case Topic.Tense:
      return Object.values(SpanishTense);
  }
};
