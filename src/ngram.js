// Crée une fenêtre glissante de taille `size` sur un tableau.
// slidingWindow(2)(['a','b','c','d']) → [['a','b'], ['b','c'], ['c','d']]
export const slidingWindow = (size) => (items) => {
  const windows = [];
  for (let i = 0; i <= items.length - size; i++) {
    windows.push(items.slice(i, i + size));
  }
  return windows;
};

// Sépare un n-gram en (contexte, caractère suivant).
// splitContextAndNext(['h', 'e', 'l']) → [['h', 'e'], 'l']
export const splitContextAndNext = (gram) => [
  gram.slice(0, -1),
  gram[gram.length - 1],
];

// Sérialise un contexte en clé de map.
// serializeContext(['h', 'e']) → 'h\u0000e'
export const serializeContext = (context) => context.join('\u0000');

// Génère les n-grams de taille order+1.
export const buildNgrams = (order) => slidingWindow(order + 1);
