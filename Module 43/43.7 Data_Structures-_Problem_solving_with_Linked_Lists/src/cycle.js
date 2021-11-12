const cycle = (list) => {
    if (!list.head) return false;

    let pointerA = list.head;
    let pointerB = list.head;

    while (pointerA.next && pointerA.next.next) {
        pointerA = pointerA.next.next;
        pointerB = pointerB.next;

        if (pointerB == pointerA) return true;
    }
    return false;
};

module.exports = cycle;