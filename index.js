window.addEventListener('DOMContentLoaded', init);

class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

window.onerror = function(message, source, lineno, colno, error) {
  console.log("Global error caught!");
  console.log("Message:", message);
  console.log("Source:", source);
  console.log("Line:", lineno, "Column:", colno);
  console.log("Error object:", error);
  return true; 
};


/** Initializes every function, they all stem from here */
async function init() {
  let form = document.querySelector('form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let output = document.querySelector('output');
    let firstNum = document.querySelector('#first-num').value;
    let secondNum = document.querySelector('#second-num').value;
    let operator = document.querySelector('#operator').value;
    output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);
  });


  let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

  errorBtns.forEach((button) => { 
    button.addEventListener("click", () => {
      const label = button.textContent;

      switch (label) {
        case "Console Log":
          console.log("Console Log Demo");
          break;
        case "Console Error":
          console.error("-Console Error Demo");
          break;
        case "Console Count":
          console.count("Count button: ");
          break;
        case "Console Warn":
          console.warn("Console Warn Button");
          break;
        case "Console Assert":
          const number = 2;
          console.assert(number === 3, "number 2: errormsg: 'The number does not equal 3'");
          break;
        case "Console Clear":
          console.clear();
          break;
        case "Console Dir":
          console.dir(button);
          break;
        case "Console dirxml":
          console.dirxml(button);
          break;
        case "Console Group Start":
          console.group("Grouped Logs");
          console.log("Programming");
          console.log("SWE");
          break;
        case "Console Group End":
          console.groupEnd();
          break;
        case "Console Table":
          console.table([
            { name: "Joe", age: 40 },
            { name: "Alex", age: 25 },
          ]);
          break;
        case "Start Timer":
          console.time("Timer");
          break;
        case "End Timer":
          console.timeEnd("Timer");
          break;
        case "Console Trace":
          const first = () => { second(); };
          const second = () => { third(); };
          const third = () => { fourth(); };
          const fourth = () => { console.trace(); };
          first();
          break;
        case "Trigger a Global Error":
          undefinedFunction();
        case "Try/Catch":
          try {
            const firstNum = document.querySelector('#first-num').value;
            const secondNum = document.querySelector('#second-num').value;
            const operator = document.querySelector('#operator').value;

            if (operator === '/' && Number(secondNum) === 0) {
              throw new Error("Division by zero err");
            }

            const output = document.querySelector('output');
            output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);
          } catch (err) {
            console.error("An error occurred:", err.message);
            document.querySelector('output').innerHTML = `Error: ${err.message}`;
          } finally {
            console.log("Calculation Completed!");
          }
          break;
        case "Throw":
          try {
            test();
          } catch(err) {
            console.error("An error occurred:", err.name);
            console.error("An error occurred:", err.message);
          }
        break;
      }
    });
  });
}