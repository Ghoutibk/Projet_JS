export const slidingWindow = (size) => (items) => {
  const windows = [];
  for (let i = 0; i <= items.length - size; i++) {
    windows.push(items.slice(i, i + size));
  }
  return windows;
};

export const splitContextAndNext = (gram) => [
  gram.slice(0, -1),
  gram[gram.length - 1],
];

export const serializeContext = (context) => context.join('\u0000');

export const buildNgrams = (order) => slidingWindow(order + 1);
