"use strict";


class ModelSPA {
  constructor() {
    this.SPAState = {};
  }

  myView = null;

  start(view) {
    this.myView = view;
  }

  updateView() {
    if (this.myView) {
      this.myView.update();
    }
  };

  switchToStateFromURLHash() {
    let URLHash = window.location.hash;
    let stateJSON = decodeURIComponent(URLHash.slice(1));
    let state = null;
    let statePage = null;

    if (stateJSON !== '') {
      state = JSON.parse(stateJSON);
      statePage = state.pagename;
      this.SPAState = state;

    } else {
      this.SPAState = { pagename: 'Main' };
    }

    this.updateView();

    switch (statePage) {
      case 'Morse': startMorse();
        break;
      case 'Human-format': startHumanFormat();
        break;
      case 'Vigenere-cipher': startVigenere();
        break;
      case 'Expression-calculator': startExprCalculator();
        break;
      case 'Code-wars': startCodeWars();
        break;
    }
  }

  switchToState(newState) {
    location.hash = encodeURIComponent(JSON.stringify(newState));
  }
}


class ViewSPA {
  myModel = null;
  myField = null;

  start(model, field) {
    this.myModel = model;
    this.myField = field;
  }

  update() {
    let page = '';

    switch (this.myModel.SPAState.pagename) {
      case 'Main':
        page += '<h2 class="main-title"><span>H</span><span>E</span><span>L</span><span>L</span><span>O</span><span>!</span></h2>';
        document.body.style.background = 'linear-gradient(45deg, rgb(0 0 0), rgb(76 76 76), rgb(0 0 0))';
        break;

      case 'Morse':
        page += '<div class="task-wrap">';
        page += '<h3 class="task-title">Morse-decoder/encoder</h3>';
        page += '<div class="switch-wrap">';
        page += '<span>encode</span>';
        page += '<label class="switch">';
        page += '<input type="checkbox">';
        page += '<span class="slider"></span>';
        page += '</label>';
        page += '<span>decode</span>';
        page += '</div>';
        page += '<textarea class="input-code" id="input_morse" placeholder="Input value"></textarea>';
        page += '<textarea class="output-code" id="output_morse" placeholder="Result"></textarea>';
        document.body.style.background = 'linear-gradient(45deg, rgb(247, 247, 247), rgb(238, 163, 42), rgb(255, 0, 0)';
        break;

      case 'Human-format':
        page += '<div class="task-wrap human-task">';
        page += '<h3 class="task-title">Human readable duration format</h3>';
        page += '<input class="input-code data-input" id="input_sec" type="text" placeholder="Enter the number of seconds" maxlength="20" autocomplete="off">';
        page += '<div class="output-code data-output" id="output_time"></div>';
        page += '</div>';
        document.body.style.background = 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)';
        break;

      case 'Vigenere-cipher':
        page += '<div class="task-wrap">';
        page += '<h3 class="task-title">Vigenere-cipher</h3>';
        page += '<div class="switch-wrap switch-vig">';
        page += '<label class="radio-item">encrypt';
        page += '<input type="radio" name="radio" value="encrypt" checked>';
        page += '<span class="checkmark"></span>';
        page += '</label>';
        page += '<label class="radio-item">decrypt';
        page += '<input type="radio" name="radio" value="decrypt">';
        page += '<span class="checkmark"></span>';
        page += '</label>';
        page += '</div>';
        page += '<input class="input-code input-vig" id="key_vig" placeholder="Keyword" autocomplete="off">';
        page += '<textarea class="input-code textarea-vig" id="mes_vig" placeholder="Message"></textarea>';
        page += '<textarea class="output-code textarea-vig" id="out_vig" placeholder="Result"></textarea>';
        page += '</div>';
        document.body.style.background = 'linear-gradient(45deg, rgb(255 0 0), rgb(165 255 207), rgb(48 48 48))';
        break;

      case 'Expression-calculator':
        page += '<div class="task-wrap">';
        page += '<h3 class="task-title">Expression calculator</h3>';
        page += '<textarea class="input-code input-calc" placeholder="Expression"></textarea>';
        page += '<div class="calc-wrap"><button class="btn-calc">GO</button>';
        page += '<div class="output-code output-calc"></div></div>';
        page += '</div>';
        document.body.style.background = 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)';
        break;

      case 'Code-wars':
        page += '<div class="task-wrap code-wrap">';
        page += '<div class="overlay overlay-preloader"><div class="preloader"></div></div>';
        page += '<h3 class="task-title">Code wars</h3>';
        page += '<ul class="info-list">';
        page += '<li class="info-item">Username: <span></span></li>';
        page += '<li class="info-item">Honor: <span></span></li>';
        page += '<li class="info-item">Rank: <span></span></li>';
        page += '<li class="info-item" id="completed-btn">Completed: <span></span></li>';
        page += '</ul></div>';
        document.body.style.background = 'linear-gradient(49deg, rgb(248 151 151), rgb(255 223 223))';
        break;
    }

    this.myField.innerHTML = page;
  }
}


class ControllerSPA {
  myModel = null;
  myField = null;

  start(model, field) {
    this.myModel = model;
    this.myField = field;

    window.addEventListener('hashchange', () => this.myModel.switchToStateFromURLHash());

    document.querySelector('.nav-list').addEventListener('click', (e) => {
      let target = e.target;

      if (target.tagName !== 'BUTTON') return;

      switch (target.textContent) {
        case 'Main-page': this.switchToMainPage();
          break
        case 'Morse-code': this.switchToMorsePage();
          break
        case 'Human-format': this.switchToHumanFormatPage();
          break
        case 'Vigenere-cipher': this.switchToVigenereCiphertPage();
          break
        case 'Expression-calculator': this.switchToExprCalculatorPage();
          break
        case 'Code-wars': this.switchToCodeWarsPage();
          break
      }
    });
  }

  switchToMainPage() {
    this.myModel.switchToState({ pagename: 'Main' });
  }

  switchToMorsePage() {
    this.myModel.switchToState({ pagename: 'Morse' });
  }

  switchToHumanFormatPage() {
    this.myModel.switchToState({ pagename: 'Human-format' });
  }

  switchToVigenereCiphertPage() {
    this.myModel.switchToState({ pagename: 'Vigenere-cipher' });
  }

  switchToExprCalculatorPage() {
    this.myModel.switchToState({ pagename: 'Expression-calculator' });
  }

  switchToCodeWarsPage() {
    this.myModel.switchToState({ pagename: 'Code-wars' });
  }
}

const taskDiv = document.querySelector('.task');

const model = new ModelSPA();
const view = new ViewSPA();
const controller = new ControllerSPA();


model.start(view);
view.start(model, taskDiv);
controller.start(model, taskDiv);

model.switchToStateFromURLHash();

