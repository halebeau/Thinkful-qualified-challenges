//creates node containing the data and a reference to the next item
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(value) { //O(1);
        const newNode = new Node(value);

        if (this.first) {
            this.last.next = newNode
        } else {
            //set the node of the queue's next pointer to be the new Node;
            this.first = newNode;
        }
        //make the new node the last item on the queue
        this.last = newNode;
    }

    dequeue() { //O(1);
        if (this.first) {
            const dequeued = this.first;

            //update first pointer to point to the next node of the dequeued node;
            this.first = dequeued.next;

            //if the dequeued node is the last node in the queue,
            //update the last pointer to pont to 'null'
            if (dequeued === this.last) {
                this.last = null;
            }
            return dequeued.value;
        }
    }
}

module.exports = Queue;
