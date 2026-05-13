import * as R from 'ramda';
import { getOccurrences } from './model.js';
import { normalizeText, toCharArray } from './tokenize.js';

// Garde les `order` derniers caractères d'une saisie normalisée.
export const extractContext = (order) => (input) => {
  const chars = toCharArray(normalizeText(input));
  return chars.slice(-order);
};

// Convertit une table d'occurrences en liste de prédictions triées.
// { l: 3, p: 1 } → [
//   { char: 'l', count: 3, probability: 0.75 },
//   { char: 'p', count: 1, probability: 0.25 },
// ]
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

// Renvoie les `topK` caractères les plus probables après une saisie.
export const predictNext = (model) => (order) => (topK) => (input) => {
  const context = extractContext(order)(input);
  const occurrences = getOccurrences(model)(context);
  return rankPredictions(occurrences).slice(0, topK);
};
