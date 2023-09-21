const fileData = document.getElementById("data");
fileData.addEventListener("change", (e) => {
  let reader = new FileReader();
  reader.readAsText(e.target.files[0]);

  reader.onload = function () {
    let value = JSON.parse(reader.result);
    document.getElementById("num1").value = value.num1;
    document.getElementById("num2").value = value.num2;
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
});

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
  

  const isNegative = (num1.charAt(0) === '-' && num2.charAt(0) !== '-') || (num1.charAt(0) !== '-' && num2.charAt(0) === '-');
  if (num1.charAt(0) === '-') {
    num1 = num1.slice(1);
  }
  if (num2.charAt(0) === '-') {
    num2 = num2.slice(1);
  }
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
  if (isNegative && result.length > 0) {
    return '-' + result.join("");
  } else {
    return result.length === 0 ? "0" : result.join("");
  }
  
}

function divideLargeNumbers(dividend, divisor) {
  let quotient = "";
  let remainder = "";

  if (divisor == 0) {
    return "không thể chia!";
  }
  if (dividend == 0) {
    return "0";
  }

  for (let i = 0; i < dividend.length; i++) {
    let currentDigit = Number(remainder + dividend[i]);

    if (currentDigit < divisor) {
      remainder = currentDigit.toString();
      quotient += "0";
    } else {
      let tempQuotient = Math.floor(currentDigit / divisor);
      let tempRemainder = currentDigit % divisor;

      remainder = tempRemainder.toString();
      quotient += tempQuotient.toString();
    }
  }

  return `${quotient.replace(/^0+/, "") || 0}` + " dư: " + `${remainder}`;
}

// do thoi gian xu li
function performanceTime(num1, num2, func) {
  const start = performance.now();
  func(num1, num2);
  const end = performance.now();
  const time = end - start;
  showModal(func(num1, num2),time.toFixed(3))
  // alert(
  //   "result: " + func(num1, num2) + " in: " + time.toFixed(3) + " milliseconds"
  // );
}
function showModal(result,time){
  const body = document.getElementById('body')
  const div = document.createElement('div');
  const btn = document.createElement('button')
  btn.textContent = 'OK'
  div.className += 'modal'
  div.innerHTML +='<span>Result</span>'
  div.innerHTML +=`<p>Kết quả của phép tính là ${result} với thời gian thực hiện trong ${time} milliseconds </p>`
  div.appendChild(btn);
  btn.onclick = ()=>{
        body.removeChild(div)

  }
  body.appendChild(div);
  setTimeout(()=>{
    body.removeChild(div)
  },3000)
  
}
