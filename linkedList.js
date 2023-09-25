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
      console.log(num1,num2)
      const isNegative1 = num1[0] === "-";
      const isNegative2 = num2[0] === "-";
      const result = new LinkedList();
      if (isNegative1 && !isNegative2 || !isNegative1 && isNegative2) {
        result.insertAtHead("-");
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
      let finalResult = "";
      while (currentNode) {
        finalResult += currentNode.data;
        currentNode = currentNode.next;
      }
      
      return finalResult
    }
  }
  
  