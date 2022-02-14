"use strict";


class VigenereCipheringMachine {
  encrypt(message, key) {
    if (!message || !key || (!message && !key)) {
      throw new Error("Incorrect arguments!");
    }

    message = message.toUpperCase();

    let vigTable = this.createVigTable();
    let keyWord = this.createKey(message, key);
    let result = "";

    for (let i = 0; i < message.length; i++) {
      let r = vigTable[0].indexOf(message[i]);
      let c = vigTable[0].indexOf(keyWord[i]);

      if (r !== -1 && c !== -1) {
        result += vigTable[r][c];
      } else {
        result += message[i];
      }
    }

    return result;
  }

  decrypt(message, key) {
    if (!message || !key || (!message && !key)) {
      throw new Error("Incorrect arguments!");
    }

    message = message.toUpperCase();

    let vigTable = this.createVigTable();
    let keyWord = this.createKey(message, key);
    let result = "";

    for (let i = 0; i < message.length; i++) {
      let r = vigTable[0].indexOf(keyWord[i]);
      let c = -1;

      if (r !== -1) {
        c = vigTable[r].indexOf(message[i]);
      }

      if (r !== -1 && c !== -1) {
        result += vigTable[0][c];
      } else {
        result += message[i];
      }
    }

    return result;
  }

  createVigTable() {
    let table = [];
    let tableRow = [];

    for (let i = 0; i < 26; i++) {
      tableRow.push(String.fromCodePoint(i + 65));
    }

    for (let i = 0; i < 26; i++) {
      let row = [...tableRow];
      table.push(row.splice(i).concat(row));
    }

    return table;
  }

  createKey(message, key) {
    key = key.toUpperCase();
    let str = "";
    let keyWord = [];

    while (str.length < message.length) {
      str += key;
    }

    let arrKey = str.split("");

    message.split(" ").forEach((el) => {
      keyWord.push(arrKey.splice(0, el.length).join(""));
    });

    return keyWord.join(" ");
  }
}

class ModelVig {
  constructor() {
    this.key = '';
    this.message = '';
    this.result = '';
    this.method = 'encrypt';
  }

  myView = null;
  vigMachine = null;

  start(view, mashine) {
    this.myView = view;
    this.vigMachine = mashine;
  }

  updateView() {
    if (this.myView) {
      this.myView.update();
    }
  }

  write(k, m) {
    this.key = k;
    this.message = m;
    this.updateView();
  }

  calculate() {
    let keyVal = this.key;
    let mesVal = this.message;

    if (mesVal && keyVal) {
      switch (this.method) {
        case 'encrypt': this.result = this.vigMachine.encrypt(mesVal, keyVal);
          break;
        case 'decrypt': this.result = this.vigMachine.decrypt(mesVal, keyVal);
          break;
      }
    }

    this.updateView();
  }

  chooseMethod(e) {
    if (e.target.tagName === 'INPUT') {
      this.method = e.target.value;
    }
  }
}

class ViewVig {
  myModel = null;
  outEl = null;

  start(model) {
    this.myModel = model;
    this.outEl = document.querySelector('#out_vig');
  }

  update() {
    this.outEl.value = this.myModel.result;
  }
}

class ControllerVig {
  myModel = null;
  keyEl = null;
  mesEl = null;

  start(model) {
    this.myModel = model;
    this.keyEl = document.querySelector('#key_vig');
    this.mesEl = document.querySelector('#mes_vig');

    this.keyEl.addEventListener('input', () => this.setDate())
    this.mesEl.addEventListener('input', () => this.setDate())

    const switchDiv = document.querySelector('.switch-vig');
    switchDiv.addEventListener('click', (e) => this.setMethod(e));
  }

  setDate() {
    this.myModel.write(this.keyEl.value, this.mesEl.value);
    this.myModel.calculate();
  }

  setMethod(e) {
    this.myModel.chooseMethod(e);
  }
}


function startVigenere() {
  const vigMachine = new VigenereCipheringMachine();
  const modelVig = new ModelVig();
  const viewVig = new ViewVig();
  const controllerVig = new ControllerVig();

  modelVig.start(viewVig, vigMachine);
  viewVig.start(modelVig);
  controllerVig.start(modelVig);
}


// console.log(directMachine.encrypt('attack at dawn!', 'alphonse')); //  'AEIHQX SX DLLU!'
// console.log(directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse')); //  'ATTACK AT DAWN!'