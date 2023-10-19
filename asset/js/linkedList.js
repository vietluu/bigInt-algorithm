class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    insertAtHead(data) {
        const node = new Node(data, this.head);
        this.head = node;
        this.length++;
    }

    insertAtTail(data) {
        if (this.length === 0) {
            return this.insertAtHead(data);
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        const node = new Node(data, null);
        current.next = node;
        this.length++;
    }

    multiplyLinkedList(num1, num2) {
        console.log(num1, num2);
        const isNegative1 = num1[0] === '-';
        const isNegative2 = num2[0] === '-';
        const result = new LinkedList();
        if ((isNegative1 && !isNegative2) || (!isNegative1 && isNegative2)) {
            result.insertAtHead('-');
        }
        const absNum1 = isNegative1 ? num1.slice(1) : num1;
        const absNum2 = isNegative2 ? num2.slice(1) : num2;
        const len1 = absNum1.length;
        const len2 = absNum2.length;
        const product = new Array(len1 + len2).fill(0);

        for (let i = len1 - 1; i >= 0; i--) {
            for (let j = len2 - 1; j >= 0; j--) {
                const digit1 = Number(absNum1[i]);
                const digit2 = Number(absNum2[j]);
                const currProduct = digit1 * digit2;
                const sum = currProduct + product[i + j + 1];
                product[i + j] += Math.floor(sum / 10);
                product[i + j + 1] = sum % 10;
            }
        }

        for (let digit of product) {
            result.insertAtTail(digit);
        }
        let currentNode = result.head;
        let finalResult = '';
        while (currentNode) {
            finalResult += currentNode.data;
            currentNode = currentNode.next;
        }

        return finalResult;
    }
}

// cộng
function add(num1, num2) {
    const list1 = new LinkedList();
    const list2 = new LinkedList();

    for (let i = 0; i < num1.length; i++) {
        list1.insertAtHead(parseInt(num1[i], 10));
    }

    for (let i = 0; i < num2.length; i++) {
        list2.insertAtHead(parseInt(num2[i], 10));
    }

    let result = new LinkedList();
    let carry = 0;

    let current1 = list1.head;
    let current2 = list2.head;

    while (current1 || current2) {
        const digit1 = current1 ? current1.data : 0;
        const digit2 = current2 ? current2.data : 0;

        let sum = digit1 + digit2 + carry;
        carry = Math.floor(sum / 10);
        result.insertAtHead(sum % 10);

        if (current1) current1 = current1.next;
        if (current2) current2 = current2.next;
    }

    if (carry > 0) {
        result.insertAtHead(carry);
    }

    let currentNode = result.head;
    let finalResult = '';
    while (currentNode) {
        finalResult += currentNode.data;
        currentNode = currentNode.next;
    }

    return finalResult;
}

// trừ
function sub(num1, num2) {
    let isNegative = false;
    // Đảm bảo str1 là chuỗi lớn hơn hoặc bằng str2 (nếu không, hoán đổi)
    if (
        num1.length < num2.length ||
        (num1.length === num2.length && num1 < num2)
    ) {
        isNegative = true;
        [num1, num2] = [num2, num1];
    }

    const list1 = new LinkedList();
    const list2 = new LinkedList();

    let is;
    // Chuyển số thành danh sách liên kết theo từng chữ số
    for (let i = 0; i < num1.length; i++) {
        list1.insertAtHead(parseInt(num1[i], 10));
    }

    for (let i = 0; i < num2.length; i++) {
        list2.insertAtHead(parseInt(num2[i], 10));
    }

    // Thực hiện phép trừ
    let result = new LinkedList();
    let carry = 0;

    let current1 = list1.head;
    let current2 = list2.head;

    while (current1 || current2) {
        const digit1 = current1 ? current1.data : 0;
        const digit2 = current2 ? current2.data : 0;

        let subtractedDigit = digit1 - digit2 - carry;
        if (subtractedDigit < 0) {
            subtractedDigit += 10;
            carry = 1;
        } else {
            carry = 0;
        }

        result.insertAtHead(subtractedDigit);

        if (current1) current1 = current1.next;
        if (current2) current2 = current2.next;
    }

    // Loại bỏ các số 0 không cần thiết ở đầu
    while (result.head && result.head.data === 0) {
        result.head = result.head.next;
    }
    let currentNode = result.head;
    let finalResult = '';
    while (currentNode) {
        finalResult += currentNode.data;
        currentNode = currentNode.next;
    }

    return isNegative ? '-' + finalResult : finalResult;
}

export function subLinkedList(str1, str2) {
    if (str1[0] === '-' && str2[0] === '-') {
        return sub(str2.substring(1), str1.substring(1));
    } else if (str2[0] === '-') {
        return add(str1, str2.substring(1));
    } else if (str1[0] === '-') {
        return '-' + add(str1.substring(1), str2);
    }
    return sub(str1, str2);
}

export function addLinkedList(str1, str2) {
    if (str1[0] === '-' && str2[0] === '-') {
        return '-' + add(str1.substring(1), str2.substring(1));
    } else if (str1[0] === '-') {
        return sub(str2, str1.substring(1));
    } else if (str2[0] === '-') {
        return sub(str1, str2.substring(1));
    }
    return add(str1, str2);
}

const num1 = '-12';
const num2 = '-22';

const res = addLinkedList(num1, num2);
console.log(res); // Kết quả: "122667"
