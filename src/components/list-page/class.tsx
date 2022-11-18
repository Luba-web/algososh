export class Node<T> {
  item: T;
  next: Node<T> | null = null;

  constructor(item: T, next?: Node<T> | null) {
    this.item = item;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (item: T) => void;
  insertAt: (element: T, position: number) => void;
  deleteList: (index: number) => void;
  getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T>{
  private head: Node<T> | null;
  private size: number; 
  private tail: Node<T> | null;

  constructor(initState?: T[]) {
    this.size = 0;
    this.head = null;
    this.tail = null;
    initState?.forEach((elem) => {
      this.insertAt(elem, 0);
    });
  }

  append(element: T) {
    const newNode = new Node(element);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
  }

  prepend(item: T) {   
    let node = new Node(item);

    if (!this.head) {
      this.head = node;
    }
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.getSize()) {
      
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currentIndex = 0;
        let prev = this.head;

        while (currentIndex < index) {
          if(curr){
            currentIndex++
            prev = curr;
            curr = curr.next;
          }
        }

        node.next = curr;
        
        if(prev){
          prev.next = node;
        }

      }

      this.size++;
    }
  }

  deleteList(index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return null;
    }

    let curr = this.head;

    if (index === 0 && curr) {
      this.head = curr.next;
    } else {
      let prev = null;
      let currIndex = 0;

      while (currIndex < index && curr) {
        prev = curr;
        curr = curr.next;
        currIndex++;
      }

      if (prev && curr) {
        prev.next = curr.next;
      }
    }

    this.size--;
    return curr ? curr.item : null;
  }

  getSize() {
    return this.size
  }
}
