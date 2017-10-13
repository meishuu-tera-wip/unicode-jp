'use strict';

const kuromoji = require('kuromoji');
const wanakana = require('wanakana');

const replacements = {
  '　': ' ',
  '、': ',',  
  '。': '.',  
  '〃': '"',
  '〇': '0',
  '〈': '<',
  '〉': '>',
  '《': '<<',
  '》': '>>',
  '「': '"',
  '」': '"',
  '『': '\'',
  '』': '\'',
  '【': '[',
  '】': ']',
  //'〒': '',
  //'〓': '=',
  '〔': '(',
  '〕': ')',
  '〖': '[',
  '〗': ']',
  '〘': '[',
  '〙': ']',
  '〚': '[',
  '〛': ']',
  '〜': '~',
  '〝': '"',
  '〞': '"',
  //'゠': '=',
  '・': '-',

  '！': '!',
  '＂': '"',
  '＃': '#',
  '＄': '$',
  '％': '%',
  '＆': '&',
  '＇': '\'',
  '（': '(',
  '）': ')',
  '＊': '*',
  '＋': '+',
  '，': ',',
  '－': '-',
  '．': '.',
  '／': '/',
  '０': '0',
  '１': '1',
  '２': '2',
  '３': '3',
  '４': '4',
  '５': '5',
  '６': '6',
  '７': '7',
  '８': '8',
  '９': '9',
  '：': ':',
  '；': ';',
  '＜': '<',
  '＝': '=',
  '＞': '>',
  '？': '?',
  '＠': '@',
  'Ａ': 'A',
  'Ｂ': 'B',
  'Ｃ': 'C',
  'Ｄ': 'D',
  'Ｅ': 'E',
  'Ｆ': 'F',
  'Ｇ': 'G',
  'Ｈ': 'H',
  'Ｉ': 'I',
  'Ｊ': 'J',
  'Ｋ': 'K',
  'Ｌ': 'L',
  'Ｍ': 'M',
  'Ｎ': 'N',
  'Ｏ': 'O',
  'Ｐ': 'P',
  'Ｑ': 'Q',
  'Ｒ': 'R',
  'Ｓ': 'S',
  'Ｔ': 'T',
  'Ｕ': 'U',
  'Ｖ': 'V',
  'Ｗ': 'W',
  'Ｘ': 'X',
  'Ｙ': 'Y',
  'Ｚ': 'Z',
  '［': '[',
  '＼': '\\',
  '］': ']',
  '＾': '^',
  '＿': '_',
  '｀': '`',
  'ａ': 'a',
  'ｂ ': 'b',
  'ｃ ': 'c',
  'ｄ': 'd',
  'ｅ': 'e',
  'ｆ': 'f',
  'ｇ': 'g',
  'ｈ': 'h',
  'ｉ': 'i',
  'ｊ': 'j',
  'ｋ': 'k',
  'ｌ': 'l',
  'ｍ': 'm',
  'ｎ': 'n',
  'ｏ': 'o',
  'ｐ': 'p',
  'ｑ': 'q',
  'ｒ': 'r',
  'ｓ': 's',
  'ｔ': 't',
  'ｕ': 'u',
  'ｖ': 'v',
  'ｗ': 'w',
  'ｘ': 'x',
  'ｙ': 'y',
  'ｚ': 'z',
  '｛': '{',
  '｜': '|',
  '｝': '}',
  '～': '~',
  '｟': '((',
  '｠': '))',
  '｡': '.',
  '｢': '"',
  '｣': '"',
  '､': ',',
  '･': '-',
};

let tokenizer = null;

function init(callback) {
  const dicPath = require.resolve('kuromoji').replace(/dist.*/, 'dist/dict/');
  kuromoji.builder({ dicPath: dicPath }).build(function (err, newtokenizer) {
    if (err) return callback(err);

    tokenizer = newtokenizer;
    callback();
  });
};

function convert(str) {
  str = [].map.call(str, c => replacements[c] || c).join('');
  const tokens = tokenizer.tokenize(str);
  for (let token of tokens) {
    if (!token.reading) token.reading = token.surface_form;
  }

  return wanakana.toRomaji(tokens.map(t => t.reading).join(' '));
};

const kuroshiro = {
  init: init,
  convert: convert,
};

module.exports = kuroshiro;
