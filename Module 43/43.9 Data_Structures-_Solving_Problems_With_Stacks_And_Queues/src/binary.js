const Queue = require('./lib/queue');

const binary = (max) => {
    const numbers = new Queue();
    numbers.enqueue('1');
    let result = [];
    
    for (let i = 1; i <= max; i++) {
        let newNumber = numbers.dequeue();
        result.push(newNumber);
        numbers.enqueue(newNumber.concat('0'));
        numbers.enqueue(newNumber.concat('1'));
    }
    return result;
};

module.exports = binary;