 // Calculator functions
function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function divide(a, b) {
    if (b === 0) {
      return "Error: Division by zero";
    }
    return a / b;
  }
  
  // Handle the result display
  function showResult(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    let result;
  
    if (isNaN(num1) || isNaN(num2)) {
      result = "Please enter valid numbers.";
    } else {
      switch (operation) {
        case 'add':
          result = add(num1, num2);
          break;
        case 'subtract':
          result = subtract(num1, num2);
          break;
        case 'multiply':
          result = multiply(num1, num2);
          break;
        case 'divide':
          result = divide(num1, num2);
          break;
      }
    }
  
    document.getElementById('result').textContent = "Result: " + result;
  }
  