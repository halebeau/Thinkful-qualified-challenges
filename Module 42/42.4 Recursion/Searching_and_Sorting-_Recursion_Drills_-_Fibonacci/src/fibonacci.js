/**
 * Return the nth fibonacci number
 * @param {integer} n
 */
function fibonacci(n) {
  if (n === 0) return 0;
  if (!Array.isArray(n)) return fibonacci([n, 0, 1]);
  let trackingN = n.shift() - 1;
  if (trackingN === 0) return n.pop();
  n.unshift(trackingN);
  n.push(n[n.length - 1] + n[n.length - 2]);
  return fibonacci(n);
}

module.exports = fibonacci;
