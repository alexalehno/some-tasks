"use strict";


function startMorse() {

  const MORSE_TABLE = {
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
  };

  const MORSE_ENCODE = {};

  for (let key in MORSE_TABLE) {
    MORSE_ENCODE[MORSE_TABLE[key]] = key;
  }

  const inputCode = document.querySelector('#input_morse');
  const outputCode = document.querySelector('#output_morse');
  const checkbox = document.querySelector('.switch > input');

  // .................

  const initialVal = encode('Hello world', MORSE_ENCODE);

  outputCode.value = initialVal;
  inputCode.value = decode(initialVal, MORSE_TABLE);

  // .................

  checkbox.addEventListener('change', resetVal);

  inputCode.addEventListener('input', () => {
    checkbox.checked ?
      outputCode.value = decode(inputCode.value, MORSE_TABLE) :
      outputCode.value = encode(inputCode.value, MORSE_ENCODE);
  });


  function encode(val, table) {
    val = val.toLowerCase();

    return val.split('').map(el => {
      let ch = table[el];

      if (el !== ' ' && !(el in table)) ch = '[wrong]';
      if (el === ' ') ch = '';

      return ch + ' ';
    }).join('');
  }

  function decode(val, table) {
    val = val.toLowerCase();

    return val.split(' ').map(el => {
      let ch = table[el];

      if (el !== ' ' && !(el in table)) ch = ' [wrong] ';
      if (el === '') ch = ' ';

      return ch;
    }).join('');
  }

  function resetVal() {
    inputCode.value = '';
    outputCode.value = '';
  }
}
