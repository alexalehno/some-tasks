"use strict";


// ...............................................................................................................

// let expr = '12 345 678 901 234 567';
// expr = expr.split(' ').join('');

// let res = '';

// for (let i = 0; i < expr.length; i++) {
//   let el = expr[i];

//   if (isNaN(el) && el !== '.' ||
//     res[res.length - 1] === '(' ||
//     res[res.length - 3] === ')' ||
//     isFinite(el) && res[res.length - 1] === '-' && res[res.length - 1] !== '.' && isFinite(res[res.length - 3])) {
//     res += ' ' + el;
//   } else {
//     res += el;
//   }

// }

// console.log(res.split(' '));


// ...............................................................................................................
// ...............................................................................................................


function startExprCalculator() {
  const inputCalc = document.querySelector('.input-calc');
  const outputCalc = document.querySelector('.output-calc');
  const btnCalc = document.querySelector('.btn-calc');


  btnCalc.addEventListener('click', () => {
    outputCalc.textContent = '';

    if (isFinite(inputCalc.value)) return;

    try {
      outputCalc.textContent = expressionCalculator(inputCalc.value);
    } catch (err) {
      alert('Wrong!!!');
    }
  });


  function expressionCalculator(expr) {

    return calculate(toRPN(exprValidation(expr)));

    function calculate(arr) {
      let stack = [];

      for (let i = 0; i < arr.length; i++) {
        let el = arr[i];

        if (isFinite(el)) {
          stack.push(+el);

        } else {
          let second = stack.pop();
          let first = stack.pop();
          let res = null;

          if (second === 0 && el === '/') {
            throw new Error("TypeError: Division by zero.");
          }

          switch (el) {
            case '+': res = first + second;
              break;
            case '-': res = first - second;
              break;
            case '*': res = first * second;
              break;
            case '/': res = first / second;
              break;
          }

          stack.push(res);
        }
      }

      return +stack[0].toFixed(4);
    }

    function toRPN(arr) {
      const priority = {
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1,
      }

      let outStr = [];
      let stack = [];

      for (let i = 0; i < arr.length; i++) {
        let el = arr[i];

        if (isFinite(el)) {
          outStr.push(el);
        }

        if (isNaN(el) && el !== '(' && el !== ')') {
          while (priority[stack[stack.length - 1]] >= priority[el]) {
            outStr.push(stack.pop());
          }
        }

        if (isNaN(el) && el !== ')') {
          stack.push(el);
        }

        if (el === ')') {
          for (let j = stack.length - 1; j >= 0; j--) {
            if (stack[j] === '(') break;
            outStr.push(stack.pop());
          }

          stack.pop()
        }
      }

      for (let j = stack.length - 1; j >= 0; j--) {
        outStr.push(stack.pop());
      }

      return outStr;
    }

    function exprValidation(expr) {
      expr = expr.split(' ').join('');
      let b = true;
      let c = 0;
      let res = '';

      for (let i = 0; i < expr.length; i++) {
        let el = expr[i];

        if (isNaN(el) && el !== '.' ||
          res[res.length - 1] === '(' ||
          res[res.length - 3] === ')' ||
          isFinite(el) && isNaN(res[res.length - 1]) && res[res.length - 1] !== '.' && isFinite(res[res.length - 3])) {
          res += ' ' + el;
        } else {
          res += el;
        }

        if (el === '(') {
          b = false;
          c++;
        }

        if (el == ')') {
          b = true;
          c++;
        }
      }

      if (b && (c % 2 === 0)) {
        return res.split(' ').filter(el => el);
      } else {
        throw new Error("ExpressionError: Brackets must be paired");
      }
    }
  }
}
