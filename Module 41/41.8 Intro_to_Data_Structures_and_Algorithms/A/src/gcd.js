function gcd1(a, b) {
  if (a === 0) return b;
  if (b === 0) return a;
  while (b != 0) {
    let r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function gcd2(a, b) {
  if (a === 0) return b;
  if (b === 0) return a;
  const divA = [1, a];
  const divB = [1, b];
  const common = [];
  for (let i = 2; i < a - 1; i++) {
    if (a % i === 0) divA.push(i);
  }
  for (let i = 2; i < b - 1; i++) {
    if (b % i === 0) divB.push(i);
  }
  divA.forEach((n) => {
    if (divB.includes(n)) common.push(n);
  });
  let largest = -Infinity;
  common.forEach((n) => {
    if (n > largest) largest = n;
  });
  return largest;
}

module.exports = { gcd1, gcd2 };