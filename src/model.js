import * as R from 'ramda';
import {
  buildNgrams,                // ← attention, on a pas créé celle-là !
  serializeContext,
  splitContextAndNext,
} from './ngram.js';
import { normalizeText, toCharArray } from './tokenize.js';
