import * as R from 'ramda';

export const slidingWindow = R.curry((size, items) =>
  R.times(
    (index) => R.slice(index, index + size, items),
    Math.max(0, items.length - size + 1),
  ),
);

export const splitContextAndNext = (gram) => [R.init(gram), R.last(gram)];
export const serializeContext = R.join('\u0000');
