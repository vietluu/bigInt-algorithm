import { performanceTime } from './performanceTime.js';
import { add, addLargeIntegers } from './add.mjs';
import { getRandomLargeIntegersInRange } from './random.js';
import { subtractLargeIntegers } from './sub.mjs';
import { divideLargeIntegers } from './div.mjs';
// import { divideLargeIntegersStack } from './div-stack.mjs';
import { subLinkedList, addLinkedList } from './subsumLinked.mjs';
import { multiplyStrings } from './mul.js';
import { multiplyLargeNumberLinkedlist } from './linkedList.js';
import { addLargeIntegersArr, subtractLargeIntegersArr } from './subsumArr.mjs';
// import { multiplyLargeNumberDBLinkedList } from './doubleLinkedlist.js';

const randomBtn = document.getElementById('random');
const number1 = document.getElementById('num1');
const number2 = document.getElementById('num2');
const res = document.getElementById('result');
const timeInput = document.querySelector('.time');
const clearBtn = document.getElementById('clear');

const compareString = document.querySelector('.compare-string');
const compareLinked = document.querySelector('.compare-linked');
const compareStack = document.querySelector('.compare-stack');
const compareArr = document.querySelector('.compare-array');
const randomStart = document.querySelector('.random-start');
const randomEnd = document.querySelector('.random-end');

const fileData = document.getElementById('data');
const saveFileBtn = document.getElementById('savefile');

fileData.addEventListener('change', (e) => {
    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    reader.onload = function () {
        let value = JSON.parse(reader.result);
        number1.value = value.num1;
        number2.value = value.num2;
        res.value = value.result;
        compareString.innerText = value.timeStr;
        compareLinked.innerText = value.timeLinked;
    };

    reader.onerror = function () {
        console.log(reader.error);
    };
});

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    mathAction(e);
});

function mathAction(e) {
    e.preventDefault();
    // const list = new LinkedList();
    // const { multiplyLinkedList } = list;
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const select = document.getElementById('math').value;
    // console.log(num1, num2, select);
    switch (select) {
        case 'summation':
            let arr1 = num1
                .split('')
                .map((char) =>
                    isNaN(parseInt(char, 10)) ? char : parseInt(char, 10)
                );
            let arr2 = num2
                .split('')
                .map((char) =>
                    isNaN(parseInt(char, 10)) ? char : parseInt(char, 10)
                );
            const dataAdd = {
                str: performanceTime(num1, num2, addLargeIntegers),
                linked: performanceTime(num1, num2, addLinkedList),
                arr: performanceTime(arr1, arr2, addLargeIntegersArr),
            };
            if (dataAdd.str.result === dataAdd.linked.result) {
                res.value = dataAdd.str.result;
                compareString.innerText = dataAdd.str.time.toFixed(9) + ' ms';
                compareLinked.innerText =
                    dataAdd.linked.time.toFixed(9) + ' ms';
                compareArr.innerText = dataAdd.arr.time.toFixed(9) + ' ms';
            }
            break;
        case 'subtraction':
            let arrSub1 = num1
                .split('')
                .map((char) =>
                    isNaN(parseInt(char, 10)) ? char : parseInt(char, 10)
                );
            let arrSub2 = num2
                .split('')
                .map((char) =>
                    isNaN(parseInt(char, 10)) ? char : parseInt(char, 10)
                );
            const dataSub = {
                str: performanceTime(num1, num2, subtractLargeIntegers),
                linked: performanceTime(num1, num2, subLinkedList),
                arr: performanceTime(
                    arrSub1,
                    arrSub2,
                    subtractLargeIntegersArr
                ),
            };
            if (dataSub.str.result === dataSub.linked.result) {
                res.value = dataSub.str.result;
                compareString.innerText = dataSub.str.time.toFixed(9) + ' ms';
                compareLinked.innerText =
                    dataSub.linked.time.toFixed(9) + ' ms';
                compareArr.innerText = dataSub.arr.time.toFixed(9) + ' ms';
            }

            break;
        case 'division':
            if (num2 == '0') {
                res.value = 'ko chia cho 0';
                break;
            }
            const dataDiv = {
                string: performanceTime(num1, num2, divideLargeIntegers),
                // stack: performanceTime(num1, num2, divideLargeIntegersStack),
            };
            res.value = dataDiv.string.result;

            compareString.innerText = dataDiv.string.time.toFixed(9) + ' ms';
            // compareStack.innerText = dataDiv.stack.time.toFixed(9) + ' ms';
            break;
        case 'multiplication':
            const dataMul = {
                str: performanceTime(num1, num2, multiplyStrings),
                linked: performanceTime(
                    num1,
                    num2,
                    multiplyLargeNumberLinkedlist
                ),
            };
            console.log(dataMul);
            if (dataMul.str.result === dataMul.linked.result) {
                res.value = dataMul.str.result;
                compareString.innerText = dataMul.str.time.toFixed(9) + ' ms';
                compareLinked.innerText =
                    dataMul.linked.time.toFixed(9) + ' ms';
            }

            break;
        default:
            return;
    }
    return;
}

// sử dụng hàm random
randomBtn.onclick = () => {
    let n1 = Number(randomStart.value);
    let n2 = Number(randomEnd.value);

    n1 == 0 && (n1 = 5000);
    n2 == 0 && (n2 = 5200);
    console.log(n1, n2);
    number1.value = getRandomLargeIntegersInRange(n1, n2);
    number2.value = getRandomLargeIntegersInRange(n1, n2);
};

clearBtn.onclick = () => {
    number1.value = '';
    number2.value = '';
    res.value = '';
    compareString.innerText = '0ms';
    compareStack.innerText = '0ms';
    compareLinked.innerText = '0ms';
    timeInput.value = '0 milliseconds';
};

saveFileBtn.onclick = () => {
    let dataToSave = {
        num1: number1.value,
        num2: number2.value,
        result: res.value,
        timeStr: compareString.innerText,
        timeLinked: compareLinked.innerText,
    };

    // Chuyển đổi đối tượng JSON thành một chuỗi JSON
    let dataToSaveString = JSON.stringify(dataToSave);
    const blob = new Blob([dataToSaveString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json'; // Tên tệp JSON khi người dùng tải xuống
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
};
