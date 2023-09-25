const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  matchAction(e);
});

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
  const list = new LinkedList();
  const {multiplyLinkedList} = list;
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const select = document.getElementById("math").value;
  console.log(num1, num2, select);
  switch (select) {
    case "multiplication":
      performanceTime(num1, num2, multiplyLinkedList);
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
  let isNegative = false;
  if (num1.charAt(0) === "-" && num2.charAt(0) !== "-") {
    isNegative = true;
    num1 = num1.slice(1);
  } else if (num1.charAt(0) !== "-" && num2.charAt(0) === "-") {
    isNegative = true;
    num2 = num2.slice(1);
  }

  const bigInt1 = num1.length;
  const bigInt2 = num2.length;

  const result = new Array(bigInt1 + bigInt2).fill(0);

  for (let i = bigInt1 - 1; i >= 0; i--) {
    for (let j = bigInt2 - 1; j >= 0; j--) {
      const mul_result = Number(num1[i]) * Number(num2[j]);
      const temp = result[i + j + 1] + mul_result;
      result[i + j + 1] = temp % 10;
      result[i + j] += Math.floor(temp / 10);
    }
  }

  let startIndex = 0;
  while (result[startIndex] === 0 && startIndex < result.length - 1) {
    startIndex++;
  }

  if (isNegative && result.length > startIndex) {
    return "-" + result.slice(startIndex).join("");
  } else {
    return result.length === startIndex
      ? "0"
      : result.slice(startIndex).join("");
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
  const memoizeFn  = memoize(func);
  const start = performance.now();
 const result = memoizeFn(num1,num2);
  const end = performance.now();
  const time = end - start;
  showModal(result, time.toFixed(3));
}
function memoize(fn) {
  let cache = {};
      return function(...args) {
      const n = JSON.stringify(args);
      if (n in cache) {
        return cache[n];
      }
      else {
        let result = fn(...args);
        cache[n] = result;
        return result;
      
    }
      }
  }
function showModal(result, time) {
  const body = document.getElementById("body");
  const div = document.createElement("div");
  const btn = document.createElement("button");
  btn.textContent = "OK";
  div.className += "modal";
  div.innerHTML += "<span>Result</span>";
  div.innerHTML += `<p>Kết quả của phép tính là ${result} với thời gian thực hiện trong ${time} milliseconds </p>`;
  div.appendChild(btn);
  btn.onclick = () => {
    clearTimeout(timeout);
    body.removeChild(div);
  };
  body.appendChild(div);
  const timeout = setTimeout(() => {
    body.removeChild(div);
  }, 3000);
}
