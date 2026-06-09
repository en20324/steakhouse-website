import type de from "./de.json";

export type TranslationDictionary = typeof de;

export type TranslationKey = {
  [K in keyof TranslationDictionary]: TranslationDictionary[K] extends string
    ? K
    : {
        [K2 in keyof TranslationDictionary[K]]: `${K & string}.${K2 & string}`;
      }[keyof TranslationDictionary[K]];
}[keyof TranslationDictionary];
