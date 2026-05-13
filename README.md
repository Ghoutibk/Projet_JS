## Organisation des fichiers

- `src/tokenize.js` = nettoie le texte
- `src/ngram.js` = decoupe en n-grams (fenêtres glissantes)
- `src/model.js` = construit le modele à partir du texte
- `src/predict.js` = utilise le modele pour predire
- `src/index.js` = le point d'entree qui assemble tout
- `corpus/corpus.txt` = le texte d'entrainement

## Notes

J'ai utilisé un ordre de 3 par défaut (donc il regarde les 3 derniers caractères pour prédire le suivant). Avec un plus gros corpus on aurait
de meilleures prédictions, ici le corpus de test est assez petit donc parfois il n'a pas vu la séquence et il ne peut rien proposer.
