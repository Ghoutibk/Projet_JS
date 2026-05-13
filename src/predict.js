import * as R from 'ramda';
import { getOccurrences } from './model.js';
import { normalizeText, toCharArray } from './tokenize.js';

export const extractContext = (order) => (input) => {
  const chars = toCharArray(normalizeText(input));
  return chars.slice(-order);
};

const rankPredictions = (occurrences) => {
  const counts = Object.values(occurrences);
  const total = R.sum(counts);

  const toRanked = ([char, count]) => ({
    char,
    count,
    probability: count / total,
  });

  return Object.entries(occurrences)
    .map(toRanked)
    .sort((a, b) => b.count - a.count);
};

export const predictNext = (model) => (order) => (topK) => (input) => {
  const context = extractContext(order)(input);
  const occurrences = getOccurrences(model)(context);
  return rankPredictions(occurrences).slice(0, topK);
};
