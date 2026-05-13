import * as R from 'ramda';
import {
  buildNgrams,
  serializeContext,
  splitContextAndNext,
} from './ngram.js';
import { normalizeText, toCharArray } from './tokenize.js';

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

export const trainModel = (order) =>
  R.pipe(
    normalizeText,
    toCharArray,
    buildNgrams(order),
    R.map(splitContextAndNext),
    R.reduce(incrementOccurrence, {}),
  );

export const getOccurrences = (model) => (context) =>
  model[serializeContext(context)] ?? {};
