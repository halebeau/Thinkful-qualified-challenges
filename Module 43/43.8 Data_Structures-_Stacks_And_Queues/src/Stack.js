
   
// Creates a node containing the data and a reference to the next item
class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class Stack {
    constructor() {
        this.top = null;
    }

    push(value) { //O(1)
        //create a new node;
        //add data to the new node;
        //have the pointer point to the top;
        this.top = new Node(value, this.top);
        return this;
    }

    pop() { //O(n)
        //to remove from the top of stack, pointer must point to 
        //the next item; next item becomes the top of the stack;
        const popped = this.top;
        this.top = popped.next;
        return popped.value;
    }
}

module.exports = Stack;
