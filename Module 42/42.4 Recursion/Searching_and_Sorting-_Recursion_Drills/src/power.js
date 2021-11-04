/**
 * Return base raised to the power exponent.
 * @throws Error if exponent is negative
 * @param {integer} base an integer
 * @param {integer} exponent a non-negative integer
 */

function power(base, exponent) {
  if (exponent < 0) throw "exponent should be >= 0";
  if (exponent === 0) return 1;
  if (exponent === 1) return base;
  const baseMinus1Exponent = power(base, exponent - 1);
  return base * baseMinus1Exponent;
}

module.exports = power;