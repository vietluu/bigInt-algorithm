class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0; // Thêm một biến để theo dõi độ dài
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
    this.length++; // Tăng độ dài khi thêm phần tử mới
  }
}

export function multiplyLargeNumberLinkedlist(num1, num2) {
  const isNegative = (num1[0] === '-' && num2[0] !== '-') || (num1[0] !== '-' && num2[0] === '-');
  num1 = num1.replace('-', '');
  num2 = num2.replace('-', '');

  if (num1 === '0' || num2 === '0') {
    return '0';
  }

  const num1List = new LinkedList();
  const num2List = new LinkedList();

  for (let i = num1.length - 1; i >= 0; i--) {
    num1List.addToTail(parseInt(num1[i]));
  }

  for (let i = num2.length - 1; i >= 0; i--) {
    num2List.addToTail(parseInt(num2[i]));
  }

  const result = new Array(num1.length + num2.length).fill(0);

  let num2Node = num2List.head;
  for (let i = 0; num2Node !== null; i++) {
    let num1Node = num1List.head;
    let carry = 0;

    for (let j = 0; num1Node !== null; j++) {
      const product = num2Node.value * num1Node.value + result[i + j] + carry;
      carry = Math.floor(product / 10);
      result[i + j] = product % 10;
      num1Node = num1Node.next;
    }

    if (carry > 0) {
      result[i + num1List.length] += carry;
    }

    num2Node = num2Node.next;
  }

  // Loại bỏ số 0 ở đầu
  while (result.length > 1 && result[result.length - 1] === 0) {
    result.pop();
  }

  let finalResult = result.reverse().join('');
  if (isNegative) {
    finalResult = '-' + finalResult;
  }

  return finalResult;
}
