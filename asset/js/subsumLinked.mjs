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
        const node = new Node(data);
        node.next = this.head; // Trỏ nút mới tới nút gốc hiện tại
        this.head = node;
        this.length++;
    }

    insertAtTail(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node; // Nếu danh sách liên kết rỗng, gán nút mới thành nút gốc
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node; // Trỏ nút cuối cùng tới nút mới
        }
        this.length++;
    }

    addToTail(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
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
// let isNegative = false;

// // Kiểm tra chiều dài của linked list và so sánh giá trị
// const length1 = getLength(num1);
// const length2 = getLength(num2);

// if (length1 < length2 || (length1 === length2 && compareLinkedList(num1, num2) < 0)) {
//     isNegative = true;
//     [num1, num2] = [num2, num1];
// }

// function getLength(list) {
//     let length = 0;
//     let current = list.head;

//     while (current) {
//         length++;
//         current = current.next;
//     }

//     return length;
// }
// function compareLinkedList(list1, list2) {
//     let current1 = list1.head;
//     let current2 = list2.head;

//     while (current1 && current2) {
//         if (current1.data < current2.data) {
//             return -1;
//         } else if (current1.data > current2.data) {
//             return 1;
//         }

//         current1 = current1.next;
//         current2 = current2.next;
//     }

//     // Nếu một trong hai linked list đã kết thúc, so sánh chiều dài
//     if (!current1 && current2) {
//         return -1;
//     } else if (current1 && !current2) {
//         return 1;
//     }

//     // Hai linked list giống nhau
//     return 0;
// }
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
// export function subLinkedList(list1, list2) {
//     if (list1.head && list1.head.value === '-' && list2.head && list2.head.value === '-') {
//         // Trường hợp cả hai đều là số âm
//         return sub(list2.head.next, list1.head.next);
//     } else if (list2.head && list2.head.value === '-') {
//         // Trường hợp chỉ có str2 là số âm
//         return add(list1, list2.head.next);
//     } else if (list1.head && list1.head.value === '-') {
//         // Trường hợp chỉ có str1 là số âm
//         return '-' + add(list1.head.next, list2);
//     }

//     // Trường hợp cả hai đều là số dương hoặc có một số âm
//     return sub(list1, list2);
// }

// export function addLinkedList(list1, list2) {
//     if (list1.head && list1.head.value === '-' && list2.head && list2.head.value === '-') {
//         // Trường hợp cả hai đều là số âm
//         return add(list1.head.next, list2.head.next);
//     } else if (list1.head && list1.head.value === '-') {
//         // Trường hợp chỉ có str1 là số âm
//         return sub(list2, list1.head.next);
//     } else if (list2.head && list2.head.value === '-') {
//         // Trường hợp chỉ có str2 là số âm
//         return sub(list1, list2.head.next);
//     }

//     // Trường hợp cả hai đều là số dương hoặc có một số âm
//     return add(list1, list2);
// }
