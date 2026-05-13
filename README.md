## Organisation des fichiers

- `src/tokenize.js` : nettoie le texte (minuscules, ponctuation, etc.)
- `src/ngram.js` : découpe en n-grams (fenêtres glissantes)
- `src/model.js` : construit le modèle à partir du texte
- `src/predict.js` : utilise le modèle pour prédire
- `src/index.js` : le point d'entrée qui assemble tout
- `corpus/corpus.txt` : le texte d'entraînement

## Notes

J'ai utilisé un ordre de 3 par défaut (donc il regarde les 3 derniers
caractères pour prédire le suivant). Avec un plus gros corpus on aurait
de meilleures prédictions, là le corpus de test est petit donc parfois
il n'a pas vu la séquence et il ne peut rien proposer.
