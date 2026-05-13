import * as R from 'ramda';

export const normalizeText = R.pipe(
  (text) => text.toLowerCase(),
  R.replace(/[^\p{L}\s'-]/gu, ' '),
  R.replace(/\s+/g, ' '),
  R.trim,
);

export const toCharArray = (text) => text.split('');
