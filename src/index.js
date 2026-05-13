import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { trainModel } from './model.js';
import { predictNext } from './predict.js';

const ORDER = 3;
const TOP_K = 5;

const currentDir = dirname(fileURLToPath(import.meta.url));
const corpusPath = join(currentDir, '..', 'corpus', 'corpus.txt');

const loadCorpus = () => readFileSync(corpusPath, 'utf-8');

const formatPrediction = ({ char, count, probability }) => {
  const display = char === ' ' ? '␣' : char;
  const percent = (probability * 100).toFixed(1);
  return `  ${display}  (${count} occurrences, ${percent}%)`;
};

const displayPredictions = (predictions) => {
  if (predictions.length === 0) {
    console.log('  (aucune prédiction)');
    return;
  }
  for (const prediction of predictions) {
    console.log(formatPrediction(prediction));
  }
};

const runInteractive = (model) => {
  const predict = predictNext(model)(ORDER)(TOP_K);
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = () => {
    rl.question('\n> Tape du texte (ou "exit") : ', (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log('À bientôt !');
        rl.close();
        return;
      }

      const predictions = predict(input);
      console.log(`\nPrédictions après "${input}" :`);
      displayPredictions(predictions);
      prompt();
    });
  };

  prompt();
};

const main = () => {
  console.log(`Entraînement du modèle de Markov (ordre ${ORDER})...`);
  const corpus = loadCorpus();
  const model = trainModel(ORDER)(corpus);
  console.log(`Modèle entraîné : ${Object.keys(model).length} contextes.`);
  console.log('\nMode interactif activé.');
  runInteractive(model);
};

main();
