
function cable1(currentLength, requireLength, saleLength) {
  let count = 0;
  let i = currentLength;
  while (i < requireLength) {
    i += saleLength;
    count++;
  }
  return count;
}


function cable2(currentLength, requireLength, saleLength) {
  let distance = requireLength - currentLength;
  return Math.round(distance / saleLength);
}

module.exports = {
  cable1,
  cable2,
};