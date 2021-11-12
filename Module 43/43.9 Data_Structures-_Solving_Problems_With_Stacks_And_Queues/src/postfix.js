const Stack = require('./lib/stack');

const evaluate = (expression) => {
    const newStack = new Stack();
    expression = expression.replace(/\s/g, '');
    
    expression.split('').forEach(character => {
        if (!'+-*/'.includes(character)) {
            newStack.push(Number(character));
        }
        if ('+-*/'.includes(character)) {
            let operator = character;
            let b = newStack.pop();
            let a = newStack.pop();
            let result = eval(`${a}${operator}${b}`); 
            newStack.push(Number(result));
        }
    });
    return newStack.pop();
};

module.exports = evaluate;