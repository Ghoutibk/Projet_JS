import * as R from 'ramda';

export const normalizeText = R.pipe(
  R.toLower,
  R.replace(/[^\p{L}\s'-]/gu, ' '),
  R.replace(/\s+/g, ' '),
  R.trim,
);

export const toCharArray = R.split('');
