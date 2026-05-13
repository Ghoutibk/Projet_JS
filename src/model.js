import * as R from 'ramda';
import {
  buildNgrams,
  serializeContext,
  splitContextAndNext,
} from './ngram.js';
import { normalizeText, toCharArray } from './tokenize.js';

// Incrémente le compteur d'occurrences pour un (contexte, caractère).
const incrementOccurrence = (model, [context, nextChar]) => {
  const key = serializeContext(context);
  const occurrences = model[key] ?? {};
  const previousCount = occurrences[nextChar] ?? 0;
  return {
    ...model,
    [key]: {
      ...occurrences,
      [nextChar]: previousCount + 1,
    },
  };
};

// Construit un modèle de Markov d'ordre `order` à partir d'un texte brut.
export const trainModel = (order) =>
  R.pipe(
    normalizeText,
    toCharArray,
    buildNgrams(order),
    R.map(splitContextAndNext),
    R.reduce(incrementOccurrence, {}),
  );

// Récupère la table d'occurrences pour un contexte donné.
export const getOccurrences = (model) => (context) =>
  model[serializeContext(context)] ?? {};
