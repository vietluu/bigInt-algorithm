import { performanceTime } from './performanceTime.js';
import { addLargeIntegers } from './add.js';
import { getRandomLargeIntegersInRange } from './random.js';
import { subtractLargeIntegers } from './sub.js';
import { divideLargeNumbers } from './div.js';
import { multiplyLargeNumberDBLinkedList
} from './doubleLinkedlist.js'
import {multiplyLargeNumberLinkedlist} from './linkedList.js'
const randomBtn = document.getElementById('random');
const number1 = document.getElementById('num1');
const number2 = document.getElementById('num2');
const res = document.getElementById('result');
const timeInput = document.querySelector('.time');
const clearBtn = document.getElementById('clear');

const randomStart = document.querySelector('.random-start');
const randomEnd = document.querySelector('.random-end');

const fileData = document.getElementById('data');

fileData.addEventListener('change', (e) => {
    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    reader.onload = function () {
        let value = JSON.parse(reader.result);
        number1.value = value.num1;
        number2.value = value.num2;
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
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const select = document.getElementById('math').value;
    // console.log(num1, num2, select);
    switch (select) {
        case 'summation':
            if (num1[0] === '-' || num2[0] === '-') {
                const n1 = num1[0] === '-' ? num1.substring(1) : num1;
                const n2 = num2[0] === '-' ? num2.substring(1) : num2;

                performanceTime(n1, n2, subtractLargeIntegers, res, timeInput);
                break;
            }
            console.log('ko vao');
            performanceTime(num1, num2, addLargeIntegers, res, timeInput);
            break;
        case 'subtraction':
            if (num1[0] === '-' || num2[0] === '-') {
                if (num2[0] === '-') {
                    performanceTime(
                        num1,
                        num2.substring(1),
                        addLargeIn,
                        res,
                        timeInput
                    );
                    break;
                }
            }
            performanceTime(num1, num2, subtractLargeIntegers, res, timeInput);
            break;
        case 'division':
            performanceTime(num1, num2, divideLargeNumbers, res, timeInput);
            break;
        case 'multiplication':
            performanceTime(num1, num2, multiplyLargeNumberLinkedlist, res, timeInput);
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

    n1 == 0 && (n1 = 80);
    n2 == 0 && (n2 = 120);
    console.log(n1, n2);
    number1.value = getRandomLargeIntegersInRange(n1, n2);
    number2.value = getRandomLargeIntegersInRange(n1, n2);
};

clearBtn.onclick = () => {
    number1.value = '';
    number2.value = '';
    res.value = '';
    timeInput.value = '0 milliseconds';
};
