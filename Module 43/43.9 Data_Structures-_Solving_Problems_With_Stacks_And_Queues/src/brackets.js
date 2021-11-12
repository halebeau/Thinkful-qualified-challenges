const Stack = require("./lib/stack");

const match = (expression) => {
    const newStack = new Stack();

    for (let index = 0, limit = expression.length; index < limit; index++) {
        switch (expression[index]) {
            case '(':
            case '[':
            case '{':
                newStack.push(expression[index]);
                break;
            case ')':
                if (newStack.top ?.value === '(') {
                    newStack.pop();
                } else return false;
                break;
            case ']':
                if (newStack.top ?.value === '[') {
                    newStack.pop();
                } else return false
                break;
            case '}':
                if (newStack.top ?.value === '{') {
                    newStack.pop();
                } else return false;
        }
    }
   return !newStack.top;
};



module.exports = match;