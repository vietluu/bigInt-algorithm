function matchAction(e) {
  e.preventDefault();
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const select = document.getElementById("math").value;
  console.log(num1, num2, select);
  switch (select) {
    case "multiplication":
      performanceTime(num1, num2, multiplyStrings);
      break;
    case "Subtraction":
      performanceTime(num1, num2, multiplyStrings);
      break;
    case "division":
      performanceTime(num1, num2, divideLargeNumbers);
      break;
    case "summation":
      performanceTime(num1, num2, multiplyStrings);
      break;
    default:
      return;
  }
  return;
}

function multiplyStrings(num1, num2) {
  const bigInt1 = num1.length;
  const bigInt2 = num2.length;
  // tao mang  m+n  chu so 0
  const result = Array(bigInt1 + bigInt2).fill(0);

  for (let i = bigInt1 - 1; i >= 0; i--) {
    for (let j = bigInt2 - 1; j >= 0; j--) {
      const mul_result = Number(num1[i]) * Number(num2[j]);

      const temp = result[i + j + 1] + mul_result;
      result[i + j + 1] = temp % 10;
      result[i + j] += Math.floor(temp / 10);
    }
  }
  //loai bo so 0 thua 0 dau
  while (result[0] === 0) {
    result.shift();
  }

  return result.length === 0 ? "0" : result.join("");
}

function divideLargeNumbers(dividend, divisor) {
  let quotient = '';
  let remainder = '';

  if(divisor == 0){
    return 'không thể chia!'
  }
  if (dividend == 0) {
    return  '0'
  }

  for (let i = 0; i < dividend.length; i++) {
    let currentDigit = Number(remainder + dividend[i]);
    
    if (currentDigit < divisor) {
      remainder = currentDigit.toString();
      quotient += '0';
    } else {
      let tempQuotient = Math.floor(currentDigit / divisor);
      let tempRemainder = currentDigit % divisor;
      
      remainder = tempRemainder.toString();
      quotient += tempQuotient.toString();
    }
  }

  return `${quotient.replace(/^0+/,'') || 0}` + ' dư: ' + `${remainder}`
}

// do thoi gian xu li
function performanceTime(num1, num2, func) {
  const start = performance.now();
  func(num1, num2);
  const end = performance.now();
  const time = end - start;
  alert("result: " + func(num1, num2)  + " in: " + time.toFixed(3) + " milliseconds");
}
